import { _ as __nuxt_component_0 } from './nuxt-link-982321e5.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { r as getRequestHeaders, t as parse, v as getRequestHeader, x as destr, y as isEqual, z as setCookie, A as getCookie, B as deleteCookie } from '../../nitro/netlify.mjs';
import { u as useNuxtApp } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { v as validation$1, V as VCard, a as VSheet, b as VCardText, c as VForm, d as VTextField, e as VBtn, f as VCardActions, g as VSnackbar, h as VIcon, u as useFetch } from './VTextField-87f973f4.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

function useRequestHeaders(include) {
  var _a;
  const event = (_a = useNuxtApp().ssrContext) == null ? void 0 : _a.event;
  const headers = event ? getRequestHeaders(event) : {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.map((key) => key.toLowerCase()).filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2;
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref((_a2 = cookies[name]) != null ? _a2 : (_a = opts.default) == null ? void 0 : _a.call(opts));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const userLogin = ref({
      email: "",
      password: ""
    });
    const withError = ref({
      displayError: false,
      msg: ""
    });
    const dialoges = ref({
      success: false
    });
    const validationRules = ref(validation$1);
    const login = async () => {
      try {
        const xsrfToken = useCookie("laravel_session");
        console.log(xsrfToken);
        let headers = {
          accept: "application/json"
          /// "X-XSRF-TOKEN": xsrfToken ? xsrfToken.value : "",
        };
        if (true) {
          headers = {
            ...headers,
            ...useRequestHeaders(["cookie"])
          };
        }
        const { data } = await useFetch(
          "https://elkodaa.chd-staging.tech/api/c/auth/login",
          {
            headers,
            credentials: "include"
          }
        ).post(userLogin.value).json();
        if (data.value) {
          dialoges.value.success = true;
        } else {
          withError.value.displayError = true;
        }
      } catch (error) {
        withError.value.displayError = true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "signin primary fill-height" }, _attrs))}><div class="overlay py-6">`);
      _push(ssrRenderComponent(VCard, {
        class: "mx-auto mt-12 py-3 px-3",
        elevation: "24",
        "max-width": "500",
        rounded: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VSheet, {
              "max-width": "440",
              class: "mx-auto",
              color: "transparent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2 class="text-center text-secondary mb-1"${_scopeId2}>Login</h2>`);
                  _push3(ssrRenderComponent(VCardText, { class: "pb-3 pt-0 px-0 text-h6 text-center text-secondary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Access to our dashboard `);
                      } else {
                        return [
                          createTextVNode(" Access to our dashboard ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VForm, { ref: "createAccount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="font-weight-bold px-0 my-2 d-block"${_scopeId3}>Email</span>`);
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: userLogin.value.email,
                          "onUpdate:modelValue": ($event) => userLogin.value.email = $event,
                          label: "Email",
                          rules: validationRules.value.validation.emailRules,
                          variant: "solo"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="d-flex mb-2"${_scopeId3}><span class="font-weight-bold px-0 flex-grow-1 my-2"${_scopeId3}> Password </span>`);
                        _push4(ssrRenderComponent(_component_NuxtLink, {
                          to: "/resetPassword",
                          style: { "text-decoration": "none" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="px-0 my-1 text-capitalize text-subcolor"${_scopeId4}> Forgot password? </div>`);
                            } else {
                              return [
                                createVNode("div", { class: "px-0 my-1 text-capitalize text-subcolor" }, " Forgot password? ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: userLogin.value.password,
                          "onUpdate:modelValue": ($event) => userLogin.value.password = $event,
                          label: "Password",
                          rules: validationRules.value.validation.passowrdRules,
                          variant: "solo"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          block: "",
                          class: "py-6 my-2 font-weight-bold",
                          color: "subcolor",
                          onClick: ($event) => login()
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Login `);
                            } else {
                              return [
                                createTextVNode(" Login ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, { class: "justify-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="px-0 text-secondary"${_scopeId4}> Don&#39;t have an account ? </span>`);
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/register" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Register `);
                                        } else {
                                          return [
                                            createTextVNode(" Register ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Register ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("span", { class: "px-0 text-secondary" }, " Don't have an account ? "),
                                createVNode(_component_NuxtLink, { to: "/register" }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Register ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("span", { class: "font-weight-bold px-0 my-2 d-block" }, "Email"),
                          createVNode(VTextField, {
                            modelValue: userLogin.value.email,
                            "onUpdate:modelValue": ($event) => userLogin.value.email = $event,
                            label: "Email",
                            rules: validationRules.value.validation.emailRules,
                            variant: "solo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode("div", { class: "d-flex mb-2" }, [
                            createVNode("span", { class: "font-weight-bold px-0 flex-grow-1 my-2" }, " Password "),
                            createVNode(_component_NuxtLink, {
                              to: "/resetPassword",
                              style: { "text-decoration": "none" }
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "px-0 my-1 text-capitalize text-subcolor" }, " Forgot password? ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(VTextField, {
                            modelValue: userLogin.value.password,
                            "onUpdate:modelValue": ($event) => userLogin.value.password = $event,
                            label: "Password",
                            rules: validationRules.value.validation.passowrdRules,
                            variant: "solo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VBtn, {
                            block: "",
                            class: "py-6 my-2 font-weight-bold",
                            color: "subcolor",
                            onClick: ($event) => login()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Login ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VCardActions, { class: "justify-center" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "px-0 text-secondary" }, " Don't have an account ? "),
                              createVNode(_component_NuxtLink, { to: "/register" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Register ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h2", { class: "text-center text-secondary mb-1" }, "Login"),
                    createVNode(VCardText, { class: "pb-3 pt-0 px-0 text-h6 text-center text-secondary" }, {
                      default: withCtx(() => [
                        createTextVNode(" Access to our dashboard ")
                      ]),
                      _: 1
                    }),
                    createVNode(VForm, { ref: "createAccount" }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "font-weight-bold px-0 my-2 d-block" }, "Email"),
                        createVNode(VTextField, {
                          modelValue: userLogin.value.email,
                          "onUpdate:modelValue": ($event) => userLogin.value.email = $event,
                          label: "Email",
                          rules: validationRules.value.validation.emailRules,
                          variant: "solo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                        createVNode("div", { class: "d-flex mb-2" }, [
                          createVNode("span", { class: "font-weight-bold px-0 flex-grow-1 my-2" }, " Password "),
                          createVNode(_component_NuxtLink, {
                            to: "/resetPassword",
                            style: { "text-decoration": "none" }
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "px-0 my-1 text-capitalize text-subcolor" }, " Forgot password? ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(VTextField, {
                          modelValue: userLogin.value.password,
                          "onUpdate:modelValue": ($event) => userLogin.value.password = $event,
                          label: "Password",
                          rules: validationRules.value.validation.passowrdRules,
                          variant: "solo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                        createVNode(VBtn, {
                          block: "",
                          class: "py-6 my-2 font-weight-bold",
                          color: "subcolor",
                          onClick: ($event) => login()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Login ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VCardActions, { class: "justify-center" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "px-0 text-secondary" }, " Don't have an account ? "),
                            createVNode(_component_NuxtLink, { to: "/register" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Register ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 512)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VSheet, {
                "max-width": "440",
                class: "mx-auto",
                color: "transparent"
              }, {
                default: withCtx(() => [
                  createVNode("h2", { class: "text-center text-secondary mb-1" }, "Login"),
                  createVNode(VCardText, { class: "pb-3 pt-0 px-0 text-h6 text-center text-secondary" }, {
                    default: withCtx(() => [
                      createTextVNode(" Access to our dashboard ")
                    ]),
                    _: 1
                  }),
                  createVNode(VForm, { ref: "createAccount" }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "font-weight-bold px-0 my-2 d-block" }, "Email"),
                      createVNode(VTextField, {
                        modelValue: userLogin.value.email,
                        "onUpdate:modelValue": ($event) => userLogin.value.email = $event,
                        label: "Email",
                        rules: validationRules.value.validation.emailRules,
                        variant: "solo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                      createVNode("div", { class: "d-flex mb-2" }, [
                        createVNode("span", { class: "font-weight-bold px-0 flex-grow-1 my-2" }, " Password "),
                        createVNode(_component_NuxtLink, {
                          to: "/resetPassword",
                          style: { "text-decoration": "none" }
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "px-0 my-1 text-capitalize text-subcolor" }, " Forgot password? ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(VTextField, {
                        modelValue: userLogin.value.password,
                        "onUpdate:modelValue": ($event) => userLogin.value.password = $event,
                        label: "Password",
                        rules: validationRules.value.validation.passowrdRules,
                        variant: "solo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                      createVNode(VBtn, {
                        block: "",
                        class: "py-6 my-2 font-weight-bold",
                        color: "subcolor",
                        onClick: ($event) => login()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Login ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VCardActions, { class: "justify-center" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "px-0 text-secondary" }, " Don't have an account ? "),
                          createVNode(_component_NuxtLink, { to: "/register" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Register ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 512)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: withError.value.displayError,
        "onUpdate:modelValue": ($event) => withError.value.displayError = $event,
        "multi-line": "",
        fixed: "",
        bottom: "",
        color: "error",
        elevation: "24"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              onClick: ($event) => withError.value.displayError = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Close `);
                } else {
                  return [
                    createTextVNode(" Close ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                onClick: ($event) => withError.value.displayError = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" Close ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}><span class="mx-2"${_scopeId}>Something Went Wrong!</span></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center" }, [
                createVNode("span", { class: "mx-2" }, "Something Went Wrong!")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: dialoges.value.success,
        "onUpdate:modelValue": ($event) => dialoges.value.success = $event,
        timeout: 2e3,
        fixed: "",
        bottom: "",
        color: "success",
        elevation: "24"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}> Saved successfully `);
            _push2(ssrRenderComponent(VIcon, { class: "mx-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-check-bold`);
                } else {
                  return [
                    createTextVNode("mdi-check-bold")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "text-center" }, [
                createTextVNode(" Saved successfully "),
                createVNode(VIcon, { class: "mx-2" }, {
                  default: withCtx(() => [
                    createTextVNode("mdi-check-bold")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-85a3e5d5.mjs.map
