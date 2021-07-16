<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-sm">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newQweetContent"
            placeholder="What's hapenning ?"
            counter
            class="new-qweet"
            maxlength="280"
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            unelevated
            :disable="!newQweetContent"
            rounded
            class="q-mb-lg"
            color="primary"
            label="Qweet"
            no-caps
          />
        </div>
      </div>
      <q-separator class="divier" size="10px" color="grey-2" />
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slower"
          leave-active-class="animated fadeOut slower"
        >
          <q-item
            class="q-py-md qweet"
            v-for="qweet in qweets"
            :key="qweet.date"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Brunch this weekend?</strong>
                <span class="text-grey-7">
                  @Brunch
                  <br class="lt-md" />
                  &bull; {{ qweet.date | relativeDate() }}
                </span>
              </q-item-label>

              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>

              <div class="row justify-between q-mt-sm qweet-icons">
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                />
                <q-btn flat round color="grey" icon="fas fa-heart" size="sm" />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fas fa-trash"
                  @click="DeleteQweet(qweet)"
                  size="sm"
                />
              </div>
            </q-item-section>

            <q-item-section side top>
              {{ qweet.date | relativeDate() }}
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>
<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divier
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
</style>

<script>
import db from "src/boot/firebase";
import { formatDistance } from "date-fns";

export default {
  name: "PageHome",
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    }
  },
  data() {
    return {
      newQweetContent: "",
      qweets: [
        // {
        //   content:
        //     "The button component also comes with a spinner or loading effect. You would use this for times when app execution may cause a delay and you want to give the user some feedback about that delay. When used, the button will display a spinning animation as soon as the user clicks the button.",
        //   date: 1620272740807
        // },
        // {
        //   content:
        //     "The button component also comes with a spinner or loading effect. You would use this for times when app execution may cause a delay and you want to give the user some feedback about that delay. When used, the button will display a spinning animation as soon as the user clicks the button.",
        //   date: 1620273647073
        // },
        // {
        //   content:
        //     "The button component also comes with a spinner or loading effect. You would use this for times when app execution may cause a delay and you want to give the user some feedback about that delay. When used, the button will display a spinning animation as soon as the user clicks the button.",
        //   date: 1620273651679
        // }
      ]
    };
  },
  mounted() {
    db.collection("qweets").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let qweetChange = change.doc.data();
          if (change.type === "added") {
            console.log("New qweet: ", change.doc.data());
            this.qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            console.log("Modified qweet: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed qweet: ", change.doc.data());
          }
        });
      });
  },
  methods: {
    addNewQweet() {
      this.qweets.unshift({
        content: this.newQweetContent,
        date: Date.now()
      });
    },
    DeleteQweet(qweet) {
      let dateDelete = qweet.date;
      const index = this.qweets.findIndex(qweet => qweet.date == dateDelete);
      this.qweets.splice(index, 1);
    },
  }
};
</script>
