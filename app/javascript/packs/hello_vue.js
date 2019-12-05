/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %>
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'

Vue.use(VueResource)

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  var element = document.getElementById("recipe-form")
  if (element != null) {

    var id = element.dataset.id
    var recipe = JSON.parse(element.dataset.recipe)
    var ingredients_attributes = JSON.parse(element.dataset.ingredientsAttributes)
    ingredients_attributes.forEach(function(ingredient) { ingredient._destroy = null })
    recipe.ingredients_attributes = ingredients_attributes

    var app = new Vue({
      el: element,
      mixins: [TurbolinksAdapter],
      data: function() {
        return { id: id, recipe: recipe }
      },
      methods: {
        addIngredient: function() {
          this.recipe.ingredients_attributes.push({
            id: null,
            amount: "",
            name: "",
            _destroy: null
          })
        },

        removeIngredient: function(index) {
          var ingredient = this.recipe.ingredients_attributes[index]

          if (ingredient.id == null) {
            this.recipe.ingredients_attributes.splice(index, 1)
          } else {
            this.recipe.ingredients_attributes[index]._destroy = "1"
          }
        },

        undoRemove: function(index) {
          this.recipe.ingredients_attributes[index]._destroy = null
        },

        saveIngredient: function() {
          // Create a new recipe
          if (this.id == null) {
            this.$http.post('/recipes', { recipe: this.recipe }).then(response => {
              Turbolinks.visit(`/recipes/${response.body.id}`)
            }, response => {
              console.log(response)
            })

            // Edit an existing recipe
          } else {
            this.$http.put(`/recipes/${this.id}`, { recipe: this.recipe }).then(response => {
              Turbolinks.visit(`/recipes/${response.body.id}`)
            }, response => {
              console.log(response)
            })
          }
        },

        existingRecipe: function() {
          return this.recipe.id != null
        }

      }
    })

  }
})