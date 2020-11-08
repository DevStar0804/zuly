<template>
  <div class="container mt-3">
    <small class="text-muted">{{ $options.__file }}</small>
    <h1 class="text-primary font-weight-bold">
      <router-link to="/"
        ><img
          src="~bootstrap-icons/icons/caret-left-fill.svg"
          alt="caret icon"
          width="30"
          height="30"
      /></router-link>
      Vetrina digitale di: {{ store.company_name }}
    </h1>
    <hr />
    <!-- <div class="row alert-danger">TODO</div> -->
    <div class="row m-3">
      <div class="col">

        <!-- display slide images -->
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators" style="margin:-100px">
            <div 
              v-for="imgurl in ImgUrls"
              :key="imgurl.id">
            <img
              :src="imgurl.url"
              alt=""
              width="100"
              height="100"
              data-target="#carouselExampleCaptions"
              :data-slide-to="imgurl.key"
              class="active"
              :style="imgurl.style"
            />
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="DeleteImage(imgurl.id)"
              style="position:absolute; margin-left:-25px;"
            ></button>
            </div>
          </ol>
          <div class="carousel-inner">
            <div
              :class="imgurl.classname"
              v-for="imgurl in ImgUrls"
              :key="imgurl.id"
              style='height: 300px;'
            >
              <img
                :src="imgurl.url"
                class="rounded mx-auto d-block"
                alt="Image"
                height='100%'
                @click="SelectLogo(imgurl.id)"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </a>
        </div>
        <!-- upload images -->
        <form class="input-group mb-3" style="padding-top:100px">
          <div class="form-file">
            <input
              type="file"
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="filesChange($event.target.name, $event.target.files)"
              accept="image/*"
            />
          </div>
        </form>
        <br />

        <div class="card">
          <div class="card-body">
            <!-- diaplsy company name -->
            <div class="input-group mb-3">
              <span class="input-group-text" id="companyname"
                >COMPANY NAME</span
              >
              <input
                type="text"
                class="form-control"
                name="company_name"
                :value="store.company_name"
                @blur="UpdateCompany($event)"
                aria-label="Sizing example input"
                aria-describedby="companyname"
              />
            </div>

            <!-- diaplsy address and city name -->
            <div class="input-group mb-3">
              <span class="input-group-text" id="address">ADDRESS</span>
              <input
                type="text"
                class="form-control"
                name="address"
                :value="store.address"
                @blur="UpdateCompany($event)"
                aria-label="Sizing example input"
                aria-describedby="address"
              />
              <span class="input-group-text" id="city">CITY</span>
              <input
                type="text"
                class="form-control"
                name="city"
                :value="store.city"
                @blur="UpdateCompany($event)"
                aria-label="Sizing example input"
                aria-describedby="city"
              />
            </div>

            <!-- diaplsy zip, vat and fiscal_code name -->
            <div class="input-group mb-3">
              <span class="input-group-text" id="zip">ZIP</span>
              <input
                type="text"
                class="form-control"
                name="zip"
                :value="store.zip"
                @blur="UpdateCompany($event)"
                aria-label="Sizing example input"
                aria-describedby="zip"
              />
              <span class="input-group-text" id="vat">VAT</span>
              <input
                type="text"
                class="form-control"
                name="vat_id"
                :value="store.vat_id"
                @blur="UpdateCompany($event)"
                aria-label="Sizing example input"
                aria-describedby="vat"
              />
              <span class="input-group-text" id="fiscal_code">FISCAL CODE</span>
              <input
                type="text"
                class="form-control"
                name="fiscal_code"
                :value="store.fiscal_code"
                @blur="UpdateCompany($event)"
                aria-label="Sizing example input"
                aria-describedby="fiscal_code"
              />
            </div>
          </div>
        </div>
        <br />

        <div class="card">
          <div class="card-body">
            <!-- diaplsy tiptap discription -->
            <div class="editor">
              <label for="" style="font-size: 24px">DESCRIPTION</label>
              <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div class="menubar">
                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                  >
                    <img :src="publicPath + 'icons/bold.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                  >
                    <img :src="publicPath + 'icons/italic.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                  >
                    <img :src="publicPath + 'icons/strike.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                  >
                    <img :src="publicPath + 'icons/underline.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                  >
                    <img :src="publicPath + 'icons/code.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.paragraph() }"
                    @click="commands.paragraph"
                  >
                    <img :src="publicPath + 'icons/paragraph.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 1 })"
                  >
                    H1
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                  >
                    H2
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                  >
                    H3
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                  >
                    <img :src="publicPath + 'icons/ul.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                  >
                    <img :src="publicPath + 'icons/ol.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                  >
                    <img :src="publicPath + 'icons/quote.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                  >
                    <img :src="publicPath + 'icons/code.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    @click="commands.horizontal_rule"
                  >
                    <img :src="publicPath + 'icons/hr.svg'" alt="" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.todo_list() }"
                    @click="commands.todo_list"
                  >
                    <img :src="publicPath + 'icons/undo.svg'" alt="" />
                  </button>

                  <button class="menubar__button" @click="commands.undo">
                    <img :src="publicPath + 'icons/undo.svg'" alt="" />
                  </button>

                  <button class="menubar__button" @click="commands.redo">
                    <img :src="publicPath + 'icons/redo.svg'" alt="" />
                  </button>
                </div>
              </editor-menu-bar>
              <editor-menu-bubble
                class="menububble"
                :editor="editor"
                @hide="hideLinkMenu"
                v-slot="{ commands, isActive, getMarkAttrs, menu }"
              >
                <div
                  class="menububble"
                  :class="{ 'is-active': menu.isActive }"
                  :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
                >
                  <form
                    class="menububble__form"
                    v-if="linkMenuIsActive"
                    @submit.prevent="setLinkUrl(commands.link, linkUrl)"
                  >
                    <input
                      class="menububble__input"
                      type="text"
                      v-model="linkUrl"
                      placeholder="https://"
                      ref="linkInput"
                      @keydown.esc="hideLinkMenu"
                    />
                    <button
                      class="menububble__button"
                      @click="setLinkUrl(commands.link, null)"
                      type="button"
                    >
                      <img :src="publicPath + 'icons/remove.svg'" alt="" />
                    </button>
                  </form>

                  <template v-else>
                    <button
                      class="menububble__button"
                      @click="showLinkMenu(getMarkAttrs('link'))"
                      :class="{ 'is-active': isActive.link() }"
                    >
                      <span>{{
                        isActive.link() ? "Update Link" : "Add Link"
                      }}</span>
                      <img :src="publicPath + 'icons/link.svg'" alt="" />
                    </button>
                  </template>
                </div>
              </editor-menu-bubble>
              <div class="card">
                <div class="card-body">
                  <editor-content
                    class="editor__content"
                    :editor="editor"
                    id="description"
                    name="description"
                    @keyup.enter="UpdateCompany($event)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div class="card">
          <div class="card-body">
            <!-- diaplsy opening hours -->
            <div v-for="(opening, index) in CurrentOpeningHours" :key="index">
              <button type="button" class="btn btn-light" style="width: 160px">
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteopening(index, 'all')"
                ></button>
                <span v-if="index == 0">MONDAY</span>
                <span v-if="index == 1">TUESDAY</span>
                <span v-if="index == 2">WEDNESDAY</span>
                <span v-if="index == 3">THURSDAY</span>
                <span v-if="index == 4">FRIDAY</span>
                <span v-if="index == 5">SATURDAY</span>
                <span v-if="index == 6">SUNDAY</span>
              </button>
              <button type="button" class="btn btn-light col-3">
                <input
                  type="text"
                  class="col-8"
                  :value="opening[0]"
                  @blur="updateopening(index, 0, $event.target.value)"
                />
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteopening(index, 0)"
                ></button>
              </button>
              <button type="button" class="btn btn-light col-3">
                <input
                  type="text"
                  class="col-8"
                  :value="opening[1]"
                  @blur="updateopening(index, 1, $event.target.value)"
                />
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteopening(index, 1)"
                ></button>
              </button>
              <button type="button" class="btn btn-light col-3">
                <input
                  type="text"
                  class="col-8"
                  :value="opening[2]"
                  @blur="updateopening(index, 2, $event.target.value)"
                />
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteopening(index, 2)"
                ></button>
              </button>
            </div>
            <br />
            <div class="input-group mb-3">
              <label for="week"
                ><img
                  :src="publicPath + 'icons/plus.png'"
                  alt=""
                  width="24"
                  height="24"
              /></label>
              <select id="week" v-model.lazy="openweek" style="border: 0px">
                <option value="selected">ADD DAY</option>
                <option value="0">MONDAY</option>
                <option value="1">TUESDAY</option>
                <option value="2">WEDNESDAY</option>
                <option value="3">THURSDAY</option>
                <option value="4">FRIDAY</option>
                <option value="5">SATURDAY</option>
                <option value="6">SUNDAY</option>
              </select>
            </div>
          </div>
        </div>
        <br />

        <div class="card">
          <div class="card-body">
            <!-- diaplsy live streaming opening hours -->
            <div v-for="(living, index) in CurrentLiveStreaming" :key="index">
              <button type="button" class="btn btn-light" style="width: 160px">
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteliving(index, 'all')"
                ></button>
                <span v-if="index == 0">MONDAY</span>
                <span v-if="index == 1">TUESDAY</span>
                <span v-if="index == 2">WEDNESDAY</span>
                <span v-if="index == 3">THURSDAY</span>
                <span v-if="index == 4">FRIDAY</span>
                <span v-if="index == 5">SATURDAY</span>
                <span v-if="index == 6">SUNDAY</span>
              </button>
              <button type="button" class="btn btn-light col-3">
                <input
                  type="text"
                  class="col-8"
                  :value="living[0]"
                  @blur="updateliving(index, 0, $event.target.value)"
                />
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteliving(index, 0)"
                ></button>
              </button>
              <button type="button" class="btn btn-light col-3">
                <input
                  type="text"
                  class="col-8"
                  :value="living[1]"
                  @blur="updateliving(index, 1, $event.target.value)"
                />
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteliving(index, 1)"
                ></button>
              </button>
              <button type="button" class="btn btn-light col-3">
                <input
                  type="text"
                  class="col-8"
                  :value="living[2]"
                  @blur="updateliving(index, 2, $event.target.value)"
                />
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="deleteliving(index, 2)"
                ></button>
              </button>
            </div>
            <br />
            <div class="input-group mb-3">
              <label for="week"
                ><img
                  :src="publicPath + 'icons/plus.png'"
                  alt=""
                  width="24"
                  height="24"
              /></label>
              <select id="week" v-model.lazy="liveweek" style="border: 0px">
                <option value="selected">ADD DAY</option>
                <option value="0">MONDAY</option>
                <option value="1">TUESDAY</option>
                <option value="2">WEDNESDAY</option>
                <option value="3">THURSDAY</option>
                <option value="4">FRIDAY</option>
                <option value="5">SATURDAY</option>
                <option value="6">SUNDAY</option>
              </select>
            </div>
          </div>
        </div>
        <br />

        <div class="card">
          <div class="card-body">
            <!-- diaplsy categories -->
            <button
              type="button"
              style="margin-left: 10px"
              class="btn btn-success btn-sm"
              v-for="category in CurrentCategories"
              :key="category.key"
            >
              <img
                :src="publicPath + 'icons/' + category.star + '.png'"
                alt=""
                width="24"
                height="24"
                @click="maincategory(category.value)"
              />
              {{ category.value.toUpperCase() }}
              <button
                type="button"
                class="btn-close btn-close"
                aria-label="Close"
                style="height: 10px; margin-right: -8px; color: red"
                @click="deletecategory(category.value)"
              ></button>
            </button>
            <div class="btn-group" style="margin-left: 10px">
              <button
                type="button"
                class="btn btn-info dropdown-toggle btn-sm"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="publicPath + 'icons/plus.png'"
                  alt=""
                  width="24"
                  height="24"
                />
                ADD CATEGORIES
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
                    @click="addcategory(category.id)"
                    v-for="category in Categories"
                    :key="category.id"
                    >{{ category.id.toUpperCase() }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />

        <div class="card">
          <div class="card-body">
            <!-- diaplsy links -->
            <div class="col">
              <label for="link" style="font-size: 24px">LINKS</label>
              <table class="table table-hover" id="link">
                <tbody>
                  <tr v-for="link in CurrentLinks" :key="link.id">
                    <td>
                      <img
                        :src="link.image"
                        alt="image"
                        with="20"
                        height="20"
                      />
                    </td>
                    <th>{{ link.display }}</th>
                    <td>{{ link.url }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-dark"
                        v-on:click="DeleteLink(link.id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="input-group mb-3">
              <label class="input-group-text" for="addlink">
                <img
                  :src="publicPath + 'icons/plus.png'"
                  alt=""
                  width="24"
                  height="24"
                />
                ADD LINK
              </label>
              <select class="form-select" id="addlink" v-model.lazy="addlink">
                <option v-for="link in Links" :key="link.id" :value="link.id">
                  {{ link.display }}
                </option>
              </select>
              <input
                type="text"
                class="form-control"
                v-model.lazy="addlinkurl"
              />
            </div>
          </div>
        </div>
        <br />

        <!-- diaplsy geolocation -->
        <div class="w-100">
          <div
            v-show="this.show_map"
            id="map"
            style="width: 100%; height: 200px"
            class="mb-5"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
import 'leaflet/dist/leaflet.css'
import '../../public/menubar.scss'
import '../../public/menububble.scss'
import 'vue-toast-notification/dist/theme-default.css'
import L from 'leaflet'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
export default {
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble
  },
  data () {
    return {
      store_id: '',
      store: {},
      editor: new Editor({
        onBlur: ({ event }) => {
          this.UpdateCompany(event)
        },
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem({
            nested: true
          }),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: ''
      }),
      CurrentCategories: [],
      Categories: [],
      currentcategory: '',
      categoryimg: '',
      ImgUrls: [],
      deleteimg: '',
      company_name: '',
      latitude: 43.87905182844069,
      longitude: 11.102328300476076,
      publicPath: process.env.BASE_URL,
      show_map: false,
      CurrentLinks: [],
      Links: [],
      addlink: '',
      addlinkurl: '',
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'contents',
      openweek: 'selected',
      liveweek: 'selected',
      OpeningHours: [],
      CurrentOpeningHours: {},
      CurrentLiveStreaming: {},
      LiveStreaming: [],
      linkUrl: null,
      linkMenuIsActive: false
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  watch: {
    CurrentOpeningHours () {
      return this.CurrentOpeningHours
    },
    openweek: function () {
      let flag = true
      for (let i in this.CurrentOpeningHours) {
        if (i === this.openweek) {
          flag = false
        }
      }
      if (flag) {
        if (this.openweek !== 'selected') {
          this.CurrentOpeningHours[this.openweek] = []
        }
      }
    },
    liveweek: function () {
      let flag = true
      for (let i in this.CurrentLiveStreaming) {
        if (i === this.liveweek) {
          flag = false
        }
      }
      if (flag) {
        if (this.liveweek !== 'selected') {
          this.CurrentLiveStreaming[this.liveweek] = []
        }
      }
    },
    addlinkurl: function () {
      this.AddLink().then((data) => {
        if (data) {
          this.Links.forEach((link) => {
            if (this.addlink === link.id) {
              this.CurrentLinks.push({
                id: data.id,
                link_id: link.id,
                display: link.display,
                image: link.image,
                url: this.addlinkurl
              })
              Vue.$toast.open({
                message: 'Aggiunto con successo!',
                type: 'success',
                position: 'top-left'
              })
            }
          })
        }
      })
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    maincategory (maincategory) {
      this.MainCategory(maincategory).then((data) => {
        if (data.status === 200) {
          this.CurrentCategories.forEach((category) => {
            if (category.value === maincategory) category.star = 'filled'
            else category.star = 'unfilled'
          })
          Vue.$toast.open({
            message: 'Selezionato con successo come categoria principale!',
            type: 'success',
            position: 'top-left'
          })
        }
      })
    },
    addcategory (addcategory) {
      let flag = true
      this.CurrentCategories.forEach((category) => {
        if (addcategory === category.value) {
          flag = false
          Vue.$toast.open({
            message: 'La categoria esiste già!',
            type: 'warning',
            position: 'top-left'
          })
        }
      })
      if (flag) {
        if (this.CurrentCategories.length === 0) {
          this.MainCategory(addcategory).then((data) => {
            if (data.status === 200) {
              Vue.$toast.open({
                message: 'Selezionato con successo come categoria principale!',
                type: 'success',
                position: 'top-left'
              })
            }
          })
        }
        this.AddCategory(addcategory).then((data) => {
          if (data.status === 200) {
            let star = 'unfilled'
            if (this.CurrentCategories.length === 0) {
              star = 'filled'
            }
            this.Categories.forEach((category) => {
              if (category.id === addcategory) {
                this.CurrentCategories.push({
                  key: category.display,
                  value: addcategory,
                  text: category.display,
                  star: star
                })
              }
            })
            Vue.$toast.open({
              message: 'Aggiunto con successo!',
              type: 'success',
              position: 'top-left'
            })
          }
        })
      }
    },
    deletecategory (deletecategory) {
      this.DeleteCategory(deletecategory).then((data) => {
        if (data.status === 200) {
          for (let i in this.CurrentCategories) {
            if (this.CurrentCategories[i].value === deletecategory) {
              this.CurrentCategories.splice(i, 1)
            }
          }
          if (this.CurrentCategories.length === 1) {
            this.MainCategory(this.CurrentCategories[0].value)
            this.CurrentCategories[0].star = 'filled'
          }
          Vue.$toast.open({
            message: 'Eliminato con successo!',
            type: 'success',
            position: 'top-left'
          })
        }
      })
    },
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      this.upload(formData)
        .then((x) => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch((err) => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()
      if (!fileList.length) return
      formData.append(fieldName, fileList[0], fileList[0].name)
      // save it
      this.save(formData)
    },
    upload (formData) {
      return fetch(`/api/stores/${this.store_id}/images`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      })
        .then((x) => x.json())
        .then((x) => {
          this.saveimage(x.id, formData)
        })
    },
    saveimage (id, formData) {
      return fetch(`/api/stores/${this.store_id}/images/${id}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          mimetype: formData.getAll('contents')[0].type
        },
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            if (this.ImgUrls.length === 0) {
              this.ImgUrls.push({
                id: res.id,
                url: `/api/stores/${this.store_id}/images/${res.id}`,
                classname: 'carousel-item active',
                style: 'opacity: 0.8; border-style:double; border-color:gray'
              })
              Vue.$toast.open({
                message: 'Aggiunto con successo!',
                type: 'success',
                position: 'top-left'
              })
            } else {
              this.ImgUrls.push({
                id: res.id,
                url: `/api/stores/${this.store_id}/images/${res.id}`,
                classname: 'carousel-item'
              })
              Vue.$toast.open({
                message: 'Aggiunto con successo!',
                type: 'success',
                position: 'top-left',
                style: 'opacity: 0.8'
              })
            }
          }
        })
    },
    format (time) {
      let result = ''
      if (time.indexOf(':') > -1) {
        if (time.split(':')[0] < 10) {
          result = '0' + time.split(':')[0] + ':'
        } else {
          result += time.split(':')[0] + ':'
        }
        if (time.split(':')[1] < 10) {
          result += '0' + time.split(':')[1]
        } else {
          result += time.split(':')[1]
        }
      } else {
        if (time < 10) {
          result += '0' + time + ':00'
        } else {
          result += time + ':00'
        }
      }
      return result
    },
    updateopening (weekday, i, openinghours) {
      if (event.target.value === '') {
        this.CurrentOpeningHours[weekday].splice(i, 1)
      } else {
        let l = this.CurrentOpeningHours[weekday].length
        if (this.CurrentOpeningHours[weekday].length <= i) {
          this.CurrentOpeningHours[weekday][l] = []
        }
        if (openinghours.indexOf(',') > -1) {
          this.CurrentOpeningHours[weekday][l][0] = this.format(
            openinghours.split(',')[0]
          )
          this.CurrentOpeningHours[weekday][l][1] = this.format(
            openinghours.split(',')[1]
          )
        }
        if (openinghours.indexOf('-') > -1) {
          this.CurrentOpeningHours[weekday][l][0] = this.format(
            openinghours.split('-')[0]
          )
          this.CurrentOpeningHours[weekday][l][1] = this.format(
            openinghours.split('-')[1]
          )
        }
        if (openinghours.indexOf(';') > -1) {
          this.CurrentOpeningHours[weekday][l][0] = this.format(
            openinghours.split(';')[0]
          )
          this.CurrentOpeningHours[weekday][l][1] = this.format(
            openinghours.split(';')[1]
          )
        }
      }
      this.UpdateOpening().then((response) => {
        if (response.status === 200) {
          Vue.$toast.open({
            message: 'Impostato con successo!',
            type: 'success',
            position: 'top-left'
          })
        }
      })
    },
    deleteopening (weekday, i) {
      if (i === 'all') {
        for (let j in this.CurrentOpeningHours) {
          if (j !== weekday) {
            delete this.CurrentOpeningHours[weekday]
          }
        }
      } else {
        this.CurrentOpeningHours[weekday].splice(i, 1)
      }
      this.UpdateOpening().then((response) => {
        if (response.status === 200) {
          Vue.$toast.open({
            message: 'Impostato con successo!',
            type: 'success',
            position: 'top-left'
          })
        }
      })
    },
    updateliving (weekday, i, livinghours) {
      if (event.target.value === '') {
        this.CurrentLiveStreaming[weekday].splice(i, 1)
      } else {
        let l = this.CurrentLiveStreaming[weekday].length
        if (this.CurrentLiveStreaming[weekday].length <= i) {
          this.CurrentLiveStreaming[weekday][l] = []
        }
        if (livinghours.indexOf(',') > -1) {
          this.CurrentLiveStreaming[weekday][l][0] = this.format(
            livinghours.split(',')[0]
          )
          this.CurrentLiveStreaming[weekday][l][1] = this.format(
            livinghours.split(',')[1]
          )
        }
        if (livinghours.indexOf('-') > -1) {
          this.CurrentLiveStreaming[weekday][l][0] = this.format(
            livinghours.split('-')[0]
          )
          this.CurrentLiveStreaming[weekday][l][1] = this.format(
            livinghours.split('-')[1]
          )
        }
        if (livinghours.indexOf(';') > -1) {
          this.CurrentLiveStreaming[weekday][l][0] = this.format(
            livinghours.split(';')[0]
          )
          this.CurrentLiveStreaming[weekday][l][1] = this.format(
            livinghours.split(';')[1]
          )
        }
      }
      this.UpdateLiving().then((response) => {
        if (response.status === 200) {
          Vue.$toast.open({
            message: 'Impostato con successo!',
            type: 'success',
            position: 'top-left'
          })
        }
      })
    },
    deleteliving (weekday, i) {
      if (i === 'all') {
        for (let j in this.CurrentLiveStream) {
          if (j !== weekday) {
            delete this.CurrentLiveStream[weekday]
          }
        }
      } else {
        this.CurrentLiveStream[weekday].splice(i, 1)
      }
      this.UpdateLiving().then((response) => {
        if (response.status === 200) {
          Vue.$toast.open({
            message: 'Impostato con successo!',
            type: 'success',
            position: 'top-left'
          })
        }
      })
    },
    async DeleteImage (id) {
      const response = await fetch(
        `/api/stores/${this.store_id}/images/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      if (response.status === 200) {
        for (let i in this.ImgUrls) {
          if (this.ImgUrls[i].id === id) {
            this.ImgUrls.splice(i, 1)
          }
        }
        Vue.$toast.open({
          message: 'Eliminato con successo!',
          type: 'success',
          position: 'top-left'
        })
      }
      return response
    },
    async SelectLogo (logoid) {
      if (
        confirm('Vuoi scegliere questa immagine come immagine del tuo logo?')
      ) {
        const response = await fetch(`/api/stores/${this.store_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ logo_id: logoid })
        })
        if (response.status === 200) {
          Vue.$toast.open({
            message: 'Selezionato con successo come logo!',
            type: 'success',
            position: 'top-left'
          })
        }
        return response
      }
    },
    async UpdateCompany (event) {
      let data = {}
      if (event.target.className === 'ProseMirror ProseMirror-focused') {
        data = { description: event.target.innerHTML }
      } else {
        switch (event.target.name) {
          case 'company_name':
            data = { company_name: event.target.value }
            break
          case 'address':
            data = { address: event.target.value }
            break
          case 'city':
            data = { city: event.target.value }
            break
          case 'zip':
            data = { zip: event.target.value }
            break
          case 'vat_id':
            data = { vat_id: event.target.value }
            break
          case 'fiscal_code':
            data = { fiscal_code: event.target.value }
            break
          default:
            break
        }
      }
      fetch(`/api/stores/${this.store_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.status === 200) {
          Vue.$toast.open({
            message: 'Aggiornato con successo!',
            type: 'success',
            position: 'top-left'
          })
        }
      })
    },
    async UpdateOpening () {
      const response = await fetch(`/api/stores/${this.store_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          opening_hours: JSON.stringify(this.CurrentOpeningHours)
        })
      })
      return response
    },
    async UpdateLiving () {
      const response = await fetch(`/api/stores/${this.store_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          live_streaming_opening_hours: JSON.stringify(
            this.CurrentLiveStreaming
          )
        })
      })
      return response
    },
    initialize (storeid) {
      if (this.latitude && this.longitude) {
        this.show_map = true
        Vue.nextTick(() => {
          // update map
          const myIcon = L.icon({
            iconUrl: this.publicPath + 'icons/favicon.png',
            iconSize: [32, 32],
            shadowSize: [38, 38], // size of the shadow
            iconAnchor: [22, 16],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -16]
          })
          var marker = L.marker([this.latitude, this.longitude], {
            icon: myIcon
          })
          var companyname = this.company_name
          var map = L.map('map', {
            dragging: !L.Browser.mobile,
            tap: !L.Browser.mobile
          }).setView([this.latitude, this.longitude], 17)
          L.DomUtil.addClass(map._container, 'leaflet-crosshair')
          map.on('click', function (e) {
            map.removeLayer(marker)
            this.latitude = e.latlng.lat
            this.longitude = e.latlng.lng
            marker = L.marker([this.latitude, this.longitude], {
              icon: myIcon
            })
            marker.addTo(map).bindPopup(companyname).openPopup()
            fetch(`/api/stores/${storeid}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                latitude: e.latlng.lat,
                longitude: e.latlng.lng
              })
            }).then((response) => {
              if (response.status === 200) {
                Vue.$toast.open({
                  message: 'Aggiornato con successo!',
                  type: 'success',
                  position: 'top-left'
                })
              }
            })
          })
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map)
          marker.addTo(map).bindPopup(companyname).openPopup()
        })
      }
    },
    async ChangeGeo (event) {
      this.latitude = event.target.value.split(',')[0]
      this.longitude = event.target.value.split(',')[1]
      this.initialize(this.sotre_id)
    },
    async fetchStore (storeId) {
      const response = await fetch('/api/stores/' + storeId, {
        mode: 'no-cors',
        headers: {
          accept: 'application/json'
        }
      })
      return response.json()
    },
    async fetchCategory () {
      const response = await fetch('/api/categories', {
        mode: 'no-cors',
        headers: {
          accept: 'application/json'
        }
      })
      return response.json()
    },
    async fetchLink () {
      const response = await fetch('/api/links', {
        mode: 'no-cors',
        headers: {
          accept: 'application/json'
        }
      })
      return response.json()
    },
    async AddCategory (addcategory) {
      const response = await fetch(
        `/api/stores/${this.store_id}/categories/${addcategory}`,
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      return response
    },
    async MainCategory (maincategory) {
      const response = await fetch(
        `/api/stores/${this.store_id}/categories/${maincategory}/main`,
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      return response
    },
    async DeleteCategory (deletecategory) {
      const response = await fetch(
        `/api/stores/${this.store_id}/categories/${deletecategory}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      return response
    },
    async AddLink () {
      const response = await fetch(
        `/api/stores/${this.store_id}/links/${this.addlink}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json'
          },
          body: JSON.stringify({ url: this.addlinkurl })
        }
      )
      return response.json()
    },
    async DeleteLink (id) {
      if (confirm('Vuoi rimuovere questa categoria?')) {
        for (let i in this.CurrentLinks) {
          if (this.CurrentLinks[i].id === id) {
            this.CurrentLinks.splice(i, 1)
          }
        }
        const response = await fetch(
          `/api/stores/${this.store_id}/links/${id}`,
          {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (response.status === 200) {
          Vue.$toast.open({
            message: 'Eliminato con successo!',
            type: 'success',
            position: 'top-left'
          })
        }
        return response
      }
    },
    onCategoryChange (currentcategory) {
      this.Categories.forEach((category) => {
        if (category.id === currentcategory) {
          this.categoryimg = category.image
        }
      })
    },
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
    }
  },
  mounted: function () {
    this.reset()
    this.store_id = this.$route.params.id
    this.fetchStore(this.store_id).then((data) => {
      this.store = data
      this.editor.setContent(data.description)
      if (data.latitude != null) this.latitude = data.latitude
      if (data.latitude != null) this.longitude = data.longitude
      this.company_name = data.company_name
      this.CurrentLinks = data.links
      if (data.opening_hours != null) {
        this.CurrentOpeningHours = data.opening_hours
      }
      if (data.live_streaming_opening_hours != null) {
        this.CurrentLiveStreaming = data.live_streaming_opening_hours
      }
      this.initialize(this.store_id)
      for (let category in data.categories) {
        let star = 'unfilled'
        if (data.main_category !== null) {
          if (category === data.main_category.display) {
            star = 'filled'
          }
        }
        this.CurrentCategories.push({
          key: category,
          text: category,
          value: data.categories[category],
          star: star
        })
      }
      let i = 0
      for (let url = 0; url < data.images.length; url++) {
        let classname = ''; let style = ''
        if (data.images[url] != null) {
          if (this.ImgUrls.length === 0) {
            classname = 'carousel-item active'
          } else {
            classname = 'carousel-item'
          }
          if (data.images[url] === data.logo_id) {
            style = 'opacity: 0.8; border-style:double; border-color:gray'
          } else {
            style = 'opacity: 0.4'
          }
          this.ImgUrls.push({
            key: i,
            id: data.images[url],
            url: `/api/stores/${this.store_id}/images/${data.images[url]}`,
            classname: classname,
            style: style
          })
          i++
        }
      }
    })
    this.fetchCategory().then((data) => {
      this.Categories = data
    })
    this.fetchLink().then((data) => {
      this.Links = data
    })
  }
}
</script>
