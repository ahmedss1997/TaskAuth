import { _ as __nuxt_component_0 } from './nuxt-link-982321e5.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { v as validation$1, V as VCard, a as VSheet, b as VCardText, c as VForm, d as VTextField, e as VBtn, f as VCardActions, g as VSnackbar, h as VIcon, u as useFetch } from './VTextField-87f973f4.mjs';
import { V as VChip } from './VChip-aee04ef2.mjs';
import '../../nitro/netlify.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import '../server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const newAccount = ref({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: ""
    });
    const withError = ref({
      displayError: false,
      errorCode: null,
      msg: ""
    });
    const dialoges = ref({
      success: false
    });
    const validationRules = ref(validation$1);
    const register = async () => {
      try {
        const { data } = await useFetch(
          "https://elkodaa.chd-staging.tech/api/c/auth/login"
        ).post(newAccount.value).json();
        if (data.value) {
          console.log(data);
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
        class: "mx-auto mt-6 py-3 px-3",
        elevation: "24",
        "max-width": "500",
        rounded: "xl"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VSheet, {
              "max-width": "440",
              class: "mx-auto"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="text-center text-secondary my-1"${_scopeId2}>Register</h3>`);
                  _push3(ssrRenderComponent(VCardText, { class: "pb-3 pt-0 px-0 text-secondary text-h6 text-center" }, {
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
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: newAccount.value.firstName,
                          "onUpdate:modelValue": ($event) => newAccount.value.firstName = $event,
                          label: "First Name",
                          rules: validationRules.value.validation.textRules,
                          variant: "solo",
                          rounded: "",
                          class: "my-2"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: newAccount.value.lastName,
                          "onUpdate:modelValue": ($event) => newAccount.value.lastName = $event,
                          label: "Last Name",
                          rules: validationRules.value.validation.textRules,
                          variant: "solo",
                          rounded: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: newAccount.value.email,
                          "onUpdate:modelValue": ($event) => newAccount.value.email = $event,
                          label: "Email",
                          rules: validationRules.value.validation.emailRules,
                          variant: "solo",
                          rounded: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: newAccount.value.password,
                          "onUpdate:modelValue": ($event) => newAccount.value.password = $event,
                          label: "Password",
                          rules: validationRules.value.validation.passowrdRules,
                          variant: "solo",
                          rounded: "",
                          type: "password"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: newAccount.value.repeatPassword,
                          "onUpdate:modelValue": ($event) => newAccount.value.repeatPassword = $event,
                          label: "Repeat Password",
                          rules: validationRules.value.confirmPassword(newAccount.value.password),
                          variant: "solo",
                          rounded: "",
                          type: "password"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          block: "",
                          rounded: "",
                          class: "py-6 mt-2 bg-secondary",
                          onClick: register
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Register `);
                            } else {
                              return [
                                createTextVNode(" Register ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, { class: "justify-center secondary--text" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="px-0 text-secondary"${_scopeId4}>Already have an account ?</span>`);
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/logIn" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      color: "subcolor",
                                      class: "px-0 text-body-1 text-capitalize"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Login `);
                                        } else {
                                          return [
                                            createTextVNode(" Login ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        color: "subcolor",
                                        class: "px-0 text-body-1 text-capitalize"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Login ")
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
                                createVNode("span", { class: "px-0 text-secondary" }, "Already have an account ?"),
                                createVNode(_component_NuxtLink, { to: "/logIn" }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      color: "subcolor",
                                      class: "px-0 text-body-1 text-capitalize"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Login ")
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
                          createVNode(VTextField, {
                            modelValue: newAccount.value.firstName,
                            "onUpdate:modelValue": ($event) => newAccount.value.firstName = $event,
                            label: "First Name",
                            rules: validationRules.value.validation.textRules,
                            variant: "solo",
                            rounded: "",
                            class: "my-2"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VTextField, {
                            modelValue: newAccount.value.lastName,
                            "onUpdate:modelValue": ($event) => newAccount.value.lastName = $event,
                            label: "Last Name",
                            rules: validationRules.value.validation.textRules,
                            variant: "solo",
                            rounded: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VTextField, {
                            modelValue: newAccount.value.email,
                            "onUpdate:modelValue": ($event) => newAccount.value.email = $event,
                            label: "Email",
                            rules: validationRules.value.validation.emailRules,
                            variant: "solo",
                            rounded: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VTextField, {
                            modelValue: newAccount.value.password,
                            "onUpdate:modelValue": ($event) => newAccount.value.password = $event,
                            label: "Password",
                            rules: validationRules.value.validation.passowrdRules,
                            variant: "solo",
                            rounded: "",
                            type: "password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VTextField, {
                            modelValue: newAccount.value.repeatPassword,
                            "onUpdate:modelValue": ($event) => newAccount.value.repeatPassword = $event,
                            label: "Repeat Password",
                            rules: validationRules.value.confirmPassword(newAccount.value.password),
                            variant: "solo",
                            rounded: "",
                            type: "password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VBtn, {
                            block: "",
                            rounded: "",
                            class: "py-6 mt-2 bg-secondary",
                            onClick: register
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Register ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, { class: "justify-center secondary--text" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "px-0 text-secondary" }, "Already have an account ?"),
                              createVNode(_component_NuxtLink, { to: "/logIn" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    color: "subcolor",
                                    class: "px-0 text-body-1 text-capitalize"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Login ")
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
                    createVNode("h3", { class: "text-center text-secondary my-1" }, "Register"),
                    createVNode(VCardText, { class: "pb-3 pt-0 px-0 text-secondary text-h6 text-center" }, {
                      default: withCtx(() => [
                        createTextVNode(" Access to our dashboard ")
                      ]),
                      _: 1
                    }),
                    createVNode(VForm, { ref: "createAccount" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: newAccount.value.firstName,
                          "onUpdate:modelValue": ($event) => newAccount.value.firstName = $event,
                          label: "First Name",
                          rules: validationRules.value.validation.textRules,
                          variant: "solo",
                          rounded: "",
                          class: "my-2"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                        createVNode(VTextField, {
                          modelValue: newAccount.value.lastName,
                          "onUpdate:modelValue": ($event) => newAccount.value.lastName = $event,
                          label: "Last Name",
                          rules: validationRules.value.validation.textRules,
                          variant: "solo",
                          rounded: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                        createVNode(VTextField, {
                          modelValue: newAccount.value.email,
                          "onUpdate:modelValue": ($event) => newAccount.value.email = $event,
                          label: "Email",
                          rules: validationRules.value.validation.emailRules,
                          variant: "solo",
                          rounded: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                        createVNode(VTextField, {
                          modelValue: newAccount.value.password,
                          "onUpdate:modelValue": ($event) => newAccount.value.password = $event,
                          label: "Password",
                          rules: validationRules.value.validation.passowrdRules,
                          variant: "solo",
                          rounded: "",
                          type: "password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                        createVNode(VTextField, {
                          modelValue: newAccount.value.repeatPassword,
                          "onUpdate:modelValue": ($event) => newAccount.value.repeatPassword = $event,
                          label: "Repeat Password",
                          rules: validationRules.value.confirmPassword(newAccount.value.password),
                          variant: "solo",
                          rounded: "",
                          type: "password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                        createVNode(VBtn, {
                          block: "",
                          rounded: "",
                          class: "py-6 mt-2 bg-secondary",
                          onClick: register
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Register ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, { class: "justify-center secondary--text" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "px-0 text-secondary" }, "Already have an account ?"),
                            createVNode(_component_NuxtLink, { to: "/logIn" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  color: "subcolor",
                                  class: "px-0 text-body-1 text-capitalize"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Login ")
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
                class: "mx-auto"
              }, {
                default: withCtx(() => [
                  createVNode("h3", { class: "text-center text-secondary my-1" }, "Register"),
                  createVNode(VCardText, { class: "pb-3 pt-0 px-0 text-secondary text-h6 text-center" }, {
                    default: withCtx(() => [
                      createTextVNode(" Access to our dashboard ")
                    ]),
                    _: 1
                  }),
                  createVNode(VForm, { ref: "createAccount" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: newAccount.value.firstName,
                        "onUpdate:modelValue": ($event) => newAccount.value.firstName = $event,
                        label: "First Name",
                        rules: validationRules.value.validation.textRules,
                        variant: "solo",
                        rounded: "",
                        class: "my-2"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                      createVNode(VTextField, {
                        modelValue: newAccount.value.lastName,
                        "onUpdate:modelValue": ($event) => newAccount.value.lastName = $event,
                        label: "Last Name",
                        rules: validationRules.value.validation.textRules,
                        variant: "solo",
                        rounded: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                      createVNode(VTextField, {
                        modelValue: newAccount.value.email,
                        "onUpdate:modelValue": ($event) => newAccount.value.email = $event,
                        label: "Email",
                        rules: validationRules.value.validation.emailRules,
                        variant: "solo",
                        rounded: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                      createVNode(VTextField, {
                        modelValue: newAccount.value.password,
                        "onUpdate:modelValue": ($event) => newAccount.value.password = $event,
                        label: "Password",
                        rules: validationRules.value.validation.passowrdRules,
                        variant: "solo",
                        rounded: "",
                        type: "password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                      createVNode(VTextField, {
                        modelValue: newAccount.value.repeatPassword,
                        "onUpdate:modelValue": ($event) => newAccount.value.repeatPassword = $event,
                        label: "Repeat Password",
                        rules: validationRules.value.confirmPassword(newAccount.value.password),
                        variant: "solo",
                        rounded: "",
                        type: "password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                      createVNode(VBtn, {
                        block: "",
                        rounded: "",
                        class: "py-6 mt-2 bg-secondary",
                        onClick: register
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Register ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardActions, { class: "justify-center secondary--text" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "px-0 text-secondary" }, "Already have an account ?"),
                          createVNode(_component_NuxtLink, { to: "/logIn" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "subcolor",
                                class: "px-0 text-body-1 text-capitalize"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Login ")
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
        "multi-line": ""
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              color: "red",
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
                color: "red",
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
            if (withError.value.errorCode) {
              _push2(`<div class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(VChip, {
                color: "error",
                size: "20"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(withError.value.errorCode)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(withError.value.errorCode), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<span class="mx-2"${_scopeId}>${ssrInterpolate(withError.value.msg)}</span></div>`);
            } else {
              _push2(`<div class="text-center"${_scopeId}><span class="mx-2"${_scopeId}>Something Went Wrong!</span></div>`);
            }
          } else {
            return [
              withError.value.errorCode ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center"
              }, [
                createVNode(VChip, {
                  color: "error",
                  size: "20"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(withError.value.errorCode), 1)
                  ]),
                  _: 1
                }),
                createVNode("span", { class: "mx-2" }, toDisplayString(withError.value.msg), 1)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center"
              }, [
                createVNode("span", { class: "mx-2" }, "Something Went Wrong!")
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-8c7327bd.mjs.map
