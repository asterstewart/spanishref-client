<template>
  <v-app>
    <v-main>
      <div class="greeter" v-if="!$auth.loading && !$auth.isAuthenticated">
        <h1 class="text-h4 text-md-h2 text-center" id="brand-logo" v-if="!resultLoading.loadedOnce">SpanishReference</h1>
        <h1 class="text-h6 text-center text-md-h6" id="brand-logo-small" v-if="resultLoading.loadedOnce">SpanishReference</h1>
        <v-container fluid>
          <v-container>
            <v-alert  width="50%" style="margin: auto; margin-bottom: 30px;" prominent dense outlined type="error" v-if="loginState.error"><span class="text-h6">{{ loginState.errorDetail }}</span></v-alert>
            <v-row justify="center">
              <v-btn v-if="!loginState.error" :loading="loading" :disabled="loading" @click="loader = 'loading'; login()" color="primary">Log in<v-icon right>mdi-account-circle</v-icon></v-btn>
            </v-row>
          </v-container>
        </v-container>
      </div>
      <div class="home" v-if="!$auth.loading && $auth.isAuthenticated">
          <h1 class="text-h4 text-md-h2 text-center" id="brand-logo" v-if="!resultLoading.loadedOnce">SpanishReference</h1>
        <h1 class="text-h6 text-center text-md-h6" id="brand-logo-small" v-if="resultLoading.loadedOnce">SpanishReference</h1>
        <v-container fluid>
          <v-container>
            <v-form v-on:submit="runLookup">
              <v-row justify="center">
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      v-model="lookup"
                      label="Verb or Phrase"
                      id="verb-input"
                      v-bind:class="{ 'mt-4' : !resultLoading.loadedOnce }"
                      outlined
                      autofocus
                      required
                      :rules="[rules.required]"
                  >
                    <template v-slot:append>
                      <v-fade-transition leave-absolute>
                        <v-progress-circular
                            v-if="resultLoading.loading"

                            size="24"
                            color="info"
                            indeterminate
                        ></v-progress-circular>
                      </v-fade-transition>
                      <v-fade-transition leave-absolute>
                        <v-btn icon v-if="!resultLoading.loading" @click="runLookup" style="bottom: 6px"><v-icon>mdi-magnify</v-icon></v-btn>
                      </v-fade-transition>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
              <v-skeleton-loader v-if="resultLoading.loading" type="article" width="550px" style="margin: auto"></v-skeleton-loader>
              <div v-if="resultLoading.loadedTitle" class="text-center">
                <p class="display-1 text--primary">{{ headType }}</p> <p class="text--primary">{{ subType }}</p><p v-if="resultLoading.infoLoaded" class="text--primary">{{ info_text }}</p>
              </div>
            <v-divider v-if="resultLoading.loaded"></v-divider><br>
      <span v-if="resultLoading.loaded">
      <v-simple-table>
        <thead>
        <strong>Indicative</strong>
        <tr>
          <th class="text-left">

          </th>
          <th class="text-left">
            Present
          </th>
          <th class="text-left">
            Preterite
          </th>
          <th class="text-left">
            Imperfect
          </th>
          <th class="text-left">
            Future
          </th>
          <th class="text-left">
            Conditional
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="person in indicativeForms" >
          <td v-for="form in person">
            {{ form }}
          </td>
        </tr>
        </tbody>
      </v-simple-table><br>
        <v-divider></v-divider><br>
        <v-simple-table>
        <thead>
        <strong>Subjunctive</strong>
        <tr>
          <th class="text-left">

          </th>
          <th class="text-left">
            Present
          </th>
          <th class="text-left">
            Imperfect
          </th>
          <th class="text-left">
            Future
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="person in subjunctiveForms" >
          <td v-for="form in person">
            {{ form }}
          </td>
        </tr>
        </tbody>
      </v-simple-table>
        <br>
        <v-divider></v-divider><br>
        <v-simple-table>
        <thead>
        <strong>Imperative</strong>
        <tr>
          <th class="text-left">

          </th>
          <th class="text-left">
            Affirmative
          </th>
          <th class="text-left">
            Negative
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="person in imperativeForms" >
          <td v-for="form in person">
            {{ form }}
          </td>
        </tr>
        </tbody>
      </v-simple-table>
        </span>

          </v-container>
        </v-container>
      </div>
    </v-main>

    <v-footer class="mt-2" padless>
      <v-row  v-if="(!$auth.loading && $auth.isAuthenticated) || loginState.error" justify="center">            <v-btn @click="logout">Log out <v-icon right>mdi-logout</v-icon></v-btn>
        <br><br></v-row>
      <v-col
          class="text-center"
          cols="12"
      >
        Created by Nathan Stewart in 2021. Credit to <a target="_blank" href="https://github.com/ghidinelli/fred-jehle-spanish-verbs">Spanish Verb Database</a> by Fred Jehle and Brian Ghidinelli. This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a> and available on <a target="_blank" href="https://github.com/ntstew/spanishref-client">Github</a>.
      </v-col>
    </v-footer>
  </v-app>

</template>

<script>
import LookupService from "@/services/LookupService.js";
export default {
  mounted() {
    if (this.findGetParameter('error') !== null) {
      this.$set(this.loginState, 'error', this.findGetParameter('error'));
      this.$set(this.loginState, 'errorDetail', this.findGetParameter('error_description'));
      this.$set(this.loginState, 'errorState', true);
    }
  },
  data() {
    return {
      loader: null, loading: false,
      loginState: { errorState: false, error: '', errorDetail: '' },
      resultLoading: {loadedOnce: false, loadedTitle: false, loading: false, loaded: false, infoLoaded: false},info_text: '', lookupSave: '', lookup: '', headType:"",subType:"", indicativeForms: {yo:['yo'],tu:['tú'],ud:['él/ella/usted'],nos:['nosotros'],vos:['vosotros'],uds:['ellos/ellas/ustedes']},
      subjunctiveForms: {yo:['yo'],tu:['tú'],ud:['él/ella/usted'],nos:['nosotros'],vos:['vosotros'],uds:['ellos/ellas/ustedes']}, imperativeForms: {yo:['yo'],tu:['tú'],ud:['él/ella/usted'],nos:['nosotros'],vos:['vosotros'],uds:['ellos/ellas/ustedes']},
      rules: {
        required: value => !!value || 'Please enter a verb.'
      }
    }
  },
  methods: {
    findGetParameter(parameterName) {
  let result = null,
      tmp = [];
  location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
},
    getToken() {
      return this.$auth.getTokenSilently();
    },
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    runLookup: function (event) {
      console.log("Running lookup")
      this.$set(this.resultLoading, 'loaded', false);
      this.$set(this.resultLoading, 'loading', true);
      this.$set(this.resultLoading, 'loadedTitle', false);
      this.$set(this.resultLoading, 'infoLoaded', false);
      if (event) {
        event.preventDefault();
      }
      let lookup = this.lookup;
      if (this.lookupSave !== '') {
        lookup = this.lookupSave;
        this.lookupSave = '';
      }
      if (lookup === "") {
        return;
      }
      this.$set(this.resultLoading, 'loading', true);
      this.getToken().then((token) => {
        let t = token;
        console.log("Asking for verb")
        LookupService.getVerbConjugation(lookup, t).then((res => {
          if (res === '') {
            console.log("Invalid verb");
            this.getToken().then((token) => {
              t = token;
              console.log("Asking for language");
            LookupService.getLanguage(lookup, t).then ((res => {
              if (res === "es") {
                console.log("Found spanish");
                // Translate to English and display
                this.getToken().then((token) => {
                  t = token;
                  console.log("Translating spen");
                  LookupService.translateText("es", lookup, t).then((res => {
                    this.headType = res;
                    this.subType = lookup;
                    this.$set(this.resultLoading, 'loadedTitle', true);
                    this.$set(this.resultLoading, 'loading', false);
                    this.$set(this.resultLoading, 'loadedOnce', true);
                    this.$set(this.rules, 'required', true);
                  }));
                });
              } else if (res === "en") {
                this.getToken().then((token) => {
                  t = token;
                  t = token;console.log("Translating ensp");
                  LookupService.translateText("en", lookup, t).then((res => {
                    this.getToken().then((token) => {
                      t = token;
                      console.log("Valid translated verb?");
                      LookupService.isValidVerb(res, t).then((valid => {
                        console.log("Got valid verb");
                        if (valid === true) {
                          this.lookupSave = res;
                          console.log("running lookup on " + this.lookupSave);
                          this.runLookup();
                        } else {
                          console.log("Not valid verb");
                          this.headType = res;
                          this.subType = lookup;
                          this.$set(this.resultLoading, 'loadedTitle', true);
                          this.$set(this.resultLoading, 'loadedOnce', true);
                          this.$set(this.resultLoading, 'loading', false);
                          this.$set(this.rules, 'required', true);
                        }
                      }));
                    });
                  }));
                });
              } else {
                console.log("All failed");
                this.$set(this.rules, 'required', 'Please enter a valid verb or phrase.');
                this.$set(this.resultLoading, 'loading', false);
              }
            }));
            });
            console.log("Returning initial statement");
            console.log("Am I preventing conjugations from being displayed?");
            return;
          }
          console.log("Showing conjugations");
          this.$set(this.rules, 'required', true);
          this.headType = res.infinitive.infinitive;
          this.subType = res.infinitive.infinitive_english;
          this.info_text = res.performer + " | " + res.tense;
          res.conjugations.filter(form => form.mood === "Imperativo Afirmativo").forEach(form => {
            this.$set(this.imperativeForms.yo, 1, form.form_1s);
            this.$set(this.imperativeForms.tu, 1, form.form_2s);
            this.$set(this.imperativeForms.ud, 1, form.form_2p);
            this.$set(this.imperativeForms.nos, 1, form.form_1p);
            this.$set(this.imperativeForms.vos, 1, form.form_3s);
            this.$set(this.imperativeForms.uds, 1, form.form_3p);
          });
          res.conjugations.filter(form => form.mood === "Imperativo Negativo").forEach(form => {
            this.$set(this.imperativeForms.yo, 2, form.form_1s);
            this.$set(this.imperativeForms.tu, 2, form.form_2s);
            this.$set(this.imperativeForms.ud, 2, form.form_2p);
            this.$set(this.imperativeForms.nos, 2, form.form_1p);
            this.$set(this.imperativeForms.vos, 2, form.form_3s);
            this.$set(this.imperativeForms.uds, 2, form.form_3p);
          });
          res.conjugations.filter(form => form.mood === "Subjuntivo").forEach(form => {
            switch (form.tense) {
              case "Presente":
                this.$set(this.subjunctiveForms.yo, 1, form.form_1s);
                this.$set(this.subjunctiveForms.tu, 1, form.form_2s);
                this.$set(this.subjunctiveForms.ud, 1, form.form_3s);
                this.$set(this.subjunctiveForms.nos, 1, form.form_1p);
                this.$set(this.subjunctiveForms.vos, 1, form.form_2p);
                this.$set(this.subjunctiveForms.uds, 1, form.form_3p);
                break;
              case "Imperfecto":
                this.$set(this.subjunctiveForms.yo, 2, form.form_1s);
                this.$set(this.subjunctiveForms.tu, 2, form.form_2s);
                this.$set(this.subjunctiveForms.ud, 2, form.form_3s);
                this.$set(this.subjunctiveForms.nos, 2, form.form_1p);
                this.$set(this.subjunctiveForms.vos, 2, form.form_2p);
                this.$set(this.subjunctiveForms.uds, 2, form.form_3p);
                break;
              case "Futuro":
                this.$set(this.subjunctiveForms.yo, 3, form.form_1s);
                this.$set(this.subjunctiveForms.tu, 3, form.form_2s);
                this.$set(this.subjunctiveForms.ud, 3, form.form_3s);
                this.$set(this.subjunctiveForms.nos, 3, form.form_1p);
                this.$set(this.subjunctiveForms.vos, 3, form.form_2p);
                this.$set(this.subjunctiveForms.uds, 3, form.form_3p);
                break;
            }
          });
          res.conjugations.filter(form => form.mood === 'Indicativo').forEach(form => {
            switch (form.tense) {
              case "Presente":
                this.$set(this.indicativeForms.yo, 1, form.form_1s);
                this.$set(this.indicativeForms.tu, 1, form.form_2s);
                this.$set(this.indicativeForms.ud, 1, form.form_3s);
                this.$set(this.indicativeForms.nos, 1, form.form_1p);
                this.$set(this.indicativeForms.vos, 1, form.form_2p);
                this.$set(this.indicativeForms.uds, 1, form.form_3p);
                break;
              case "Pretérito":
                this.$set(this.indicativeForms.yo, 2, form.form_1s);
                this.$set(this.indicativeForms.tu, 2, form.form_2s);
                this.$set(this.indicativeForms.ud, 2, form.form_3s);
                this.$set(this.indicativeForms.nos, 2, form.form_1p);
                this.$set(this.indicativeForms.vos, 2, form.form_2p);
                this.$set(this.indicativeForms.uds, 2, form.form_3p);
                break;
              case "Imperfecto":
                this.$set(this.indicativeForms.yo, 3, form.form_1s);
                this.$set(this.indicativeForms.tu, 3, form.form_2s);
                this.$set(this.indicativeForms.ud, 3, form.form_3s);
                this.$set(this.indicativeForms.nos, 3, form.form_1p);
                this.$set(this.indicativeForms.vos, 3, form.form_2p);
                this.$set(this.indicativeForms.uds, 3, form.form_3p);
                break;
              case "Condicional":
                this.$set(this.indicativeForms.yo, 5, form.form_1s);
                this.$set(this.indicativeForms.tu, 5, form.form_2s);
                this.$set(this.indicativeForms.ud, 5, form.form_3s);
                this.$set(this.indicativeForms.nos, 5, form.form_1p);
                this.$set(this.indicativeForms.vos, 5, form.form_2p);
                this.$set(this.indicativeForms.uds, 5, form.form_3p);
                break;
              case "Futuro":
                this.$set(this.indicativeForms.yo, 4, form.form_1s);
                this.$set(this.indicativeForms.tu, 4, form.form_2s);
                this.$set(this.indicativeForms.ud, 4, form.form_3s);
                this.$set(this.indicativeForms.nos, 4, form.form_1p);
                this.$set(this.indicativeForms.vos, 4, form.form_2p);
                this.$set(this.indicativeForms.uds, 4, form.form_3p);
                break;
            }
          });
          this.$set(this.resultLoading, 'loading', false);
          this.$set(this.resultLoading, 'loaded', true);
          this.$set(this.resultLoading, 'loadedTitle', true);
          this.$set(this.resultLoading, 'loadedOnce', true);
          this.$set(this.resultLoading, 'infoLoaded', true);
        })).catch((e) => {
          this.$set(this.rules, 'required', 'Sorry, something went wrong.');
          this.$set(this.resultLoading, 'loading', false);
          console.log(e);
        })
      });
    }
  }
}
</script>

<style>
#brand-logo {
  margin-top: 5%;
}
#brand-logo-small {
  margin-top: 1%;
}
</style>
