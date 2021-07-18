<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
            :key="qweet.id"
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
                <q-btn 
                  flat
                  round 
                  :color="qweet.liked?'pink':'grey'" 
                  :icon="qweet.liked?'fas fa-heart':'far fa-heart'" 
                  size="sm" 
                  @click="toggleLiked(qweet)"
                />
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
      qweets: []
    };
  },
  mounted() {
    db.collection("qweets").orderBy('date').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let qweetChange = change.doc.data();
          qweetChange.id = change.doc.id;
          if (change.type === "added") {
            this.qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            const index = this.qweets.findIndex(qweet => qweet.id == qweetChange.id);
            Object.assign(this.qweets[index],qweetChange);
          }
          if (change.type === "removed") {
            const index = this.qweets.findIndex(qweet => qweet.id == qweetChange.id);
            this.qweets.splice(index, 1);
          }
        });
      });
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked:false,
      };

      db.collection('qweets').add(newQweet).then(doRef=>{
        console.log("Document written",doRef);
      }).catch(error=>{
        console.log("Document error",error);
      })

      this.newQweetContent =  '';
    },


    DeleteQweet(qweet) {
      db.collection('qweets').doc(qweet.id).delete().then(doRef=>{
        console.log("Document Delete",doRef);
      }).catch(error=>{
        console.log("Document error Delete",error);
      });
    },

    toggleLiked(qweet){
       db.collection('qweets').doc(qweet.id).update({
         liked: !qweet.liked ,
       });
    }
  }
};
</script>
