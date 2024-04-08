import { _ as __nuxt_component_0 } from './nuxt-link-982321e5.mjs';
import { computed, ref, watch, nextTick, createVNode, mergeProps, Fragment, shallowRef, provide, withDirectives, resolveDirective, inject, vShow, defineComponent, withCtx, unref, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, readonly } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { m as makeDimensionProps, i as makeFocusProps, j as makeVFieldProps, k as useDimension, l as useFocus, n as VField, o as VOverlay, p as VProgressCircular, q as makeTagProps, r as useGroup, e as VBtn, s as makeGroupItemProps, t as makeLazyProps, w as useGroupItem, x as useLazy, M as MaybeTransition, v as validation$1, V as VCard, a as VSheet, y as VAvatar, h as VIcon, b as VCardText, c as VForm, d as VTextField, f as VCardActions, g as VSnackbar, u as useFetch } from './VTextField-87f973f4.mjs';
import { p as propsFactory, o as only, g as genericComponent, a as useProxiedModel, b as useLocale, d as provideDefaults, e as useRender, f as filterInputAttrs, m as makeComponentProps, j as makeThemeProps, l as provideTheme, n as useRtl, h as focusChild, q as convertToUnit, k as keys } from '../server.mjs';
import { V as VChip } from './VChip-aee04ef2.mjs';
import '../../nitro/netlify.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const makeVOtpInputProps = propsFactory({
  autofocus: Boolean,
  divider: String,
  focusAll: Boolean,
  label: {
    type: String,
    default: "$vuetify.input.otp"
  },
  length: {
    type: [Number, String],
    default: 6
  },
  modelValue: {
    type: [Number, String],
    default: void 0
  },
  placeholder: String,
  type: {
    type: String,
    default: "number"
  },
  ...makeDimensionProps(),
  ...makeFocusProps(),
  ...only(makeVFieldProps({
    variant: "outlined"
  }), ["baseColor", "bgColor", "class", "color", "disabled", "error", "loading", "rounded", "style", "theme", "variant"])
}, "VOtpInput");
const VOtpInput = genericComponent()({
  name: "VOtpInput",
  props: makeVOtpInputProps(),
  emits: {
    finish: (val) => true,
    "update:focused": (val) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const model = useProxiedModel(props, "modelValue", "", (val) => val == null ? [] : String(val).split(""), (val) => val.join(""));
    const {
      t
    } = useLocale();
    const length = computed(() => Number(props.length));
    const fields = computed(() => Array(length.value).fill(0));
    const focusIndex = ref(-1);
    const contentRef = ref();
    const inputRef = ref([]);
    const current = computed(() => inputRef.value[focusIndex.value]);
    function onInput() {
      if (isValidNumber(current.value.value)) {
        current.value.value = "";
        return;
      }
      const array = model.value.slice();
      const value = current.value.value;
      array[focusIndex.value] = value;
      let target = null;
      if (focusIndex.value > model.value.length) {
        target = model.value.length + 1;
      } else if (focusIndex.value + 1 !== length.value) {
        target = "next";
      }
      model.value = array;
      if (target)
        focusChild(contentRef.value, target);
    }
    function onKeydown(e) {
      const array = model.value.slice();
      const index = focusIndex.value;
      let target = null;
      if (!["ArrowLeft", "ArrowRight", "Backspace", "Delete"].includes(e.key))
        return;
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        target = "prev";
      } else if (e.key === "ArrowRight") {
        target = "next";
      } else if (["Backspace", "Delete"].includes(e.key)) {
        array[focusIndex.value] = "";
        model.value = array;
        if (focusIndex.value > 0 && e.key === "Backspace") {
          target = "prev";
        } else {
          requestAnimationFrame(() => {
            var _a;
            (_a = inputRef.value[index]) == null ? void 0 : _a.select();
          });
        }
      }
      requestAnimationFrame(() => {
        if (target != null) {
          focusChild(contentRef.value, target);
        }
      });
    }
    function onPaste(index, e) {
      var _a2;
      var _a, _b;
      e.preventDefault();
      e.stopPropagation();
      const clipboardText = (_a2 = (_a = e == null ? void 0 : e.clipboardData) == null ? void 0 : _a.getData("Text")) != null ? _a2 : "";
      if (isValidNumber(clipboardText))
        return;
      model.value = clipboardText.split("");
      (_b = inputRef.value) == null ? void 0 : _b[index].blur();
    }
    function reset() {
      model.value = [];
    }
    function onFocus(e, index) {
      focus();
      focusIndex.value = index;
    }
    function onBlur() {
      blur();
      focusIndex.value = -1;
    }
    function isValidNumber(value) {
      return props.type === "number" && /[^0-9]/g.test(value);
    }
    provideDefaults({
      VField: {
        color: computed(() => props.color),
        bgColor: computed(() => props.color),
        baseColor: computed(() => props.baseColor),
        disabled: computed(() => props.disabled),
        error: computed(() => props.error),
        variant: computed(() => props.variant)
      }
    }, {
      scoped: true
    });
    watch(model, (val) => {
      if (val.length === length.value)
        emit("finish", val.join(""));
    }, {
      deep: true
    });
    watch(focusIndex, (val) => {
      if (val < 0)
        return;
      nextTick(() => {
        var _a;
        (_a = inputRef.value[val]) == null ? void 0 : _a.select();
      });
    });
    useRender(() => {
      var _a;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      return createVNode("div", mergeProps({
        "class": ["v-otp-input", {
          "v-otp-input--divided": !!props.divider
        }, props.class],
        "style": [props.style]
      }, rootAttrs), [createVNode("div", {
        "ref": contentRef,
        "class": "v-otp-input__content",
        "style": [dimensionStyles.value]
      }, [fields.value.map((_, i) => createVNode(Fragment, null, [props.divider && i !== 0 && createVNode("span", {
        "class": "v-otp-input__divider"
      }, [props.divider]), createVNode(VField, {
        "focused": isFocused.value && props.focusAll || focusIndex.value === i,
        "key": i
      }, {
        ...slots,
        loader: void 0,
        default: () => {
          return createVNode("input", {
            "ref": (val) => inputRef.value[i] = val,
            "aria-label": t(props.label, i + 1),
            "autofocus": i === 0 && props.autofocus,
            "autocomplete": "one-time-code",
            "class": ["v-otp-input__field"],
            "disabled": props.disabled,
            "inputmode": props.type === "number" ? "numeric" : "text",
            "min": props.type === "number" ? 0 : void 0,
            "maxlength": "1",
            "placeholder": props.placeholder,
            "type": props.type === "number" ? "text" : props.type,
            "value": model.value[i],
            "onInput": onInput,
            "onFocus": (e) => onFocus(e, i),
            "onBlur": onBlur,
            "onKeydown": onKeydown,
            "onPaste": (event) => onPaste(i, event)
          }, null);
        }
      })])), createVNode("input", mergeProps({
        "class": "v-otp-input-input",
        "type": "hidden"
      }, inputAttrs, {
        "value": model.value.join("")
      }), null), createVNode(VOverlay, {
        "contained": true,
        "content-class": "v-otp-input__loader",
        "model-value": !!props.loading,
        "persistent": true
      }, {
        default: () => {
          var _a3;
          var _a2;
          return [(_a3 = (_a2 = slots.loader) == null ? void 0 : _a2.call(slots)) != null ? _a3 : createVNode(VProgressCircular, {
            "color": typeof props.loading === "boolean" ? void 0 : props.loading,
            "indeterminate": true,
            "size": "24",
            "width": "2"
          }, null)];
        }
      }), (_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      blur: () => {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.some((input) => input.blur());
      },
      focus: () => {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a[0].focus();
      },
      reset,
      isFocused
    };
  }
});
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_a = wrapper.start) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_a = wrapper.end) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_a = wrapper.move) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  var _a2, _b;
  var _a;
  const value = binding.value;
  const target = (value == null ? void 0 : value.parent) ? el.parentElement : el;
  const options = (_a2 = value == null ? void 0 : value.options) != null ? _a2 : {
    passive: true
  };
  const uid = (_a = binding.instance) == null ? void 0 : _a.$.uid;
  if (!target || !uid)
    return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = (_b = target._touchHandlers) != null ? _b : /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  var _a, _b;
  const target = ((_a = binding.value) == null ? void 0 : _a.parent) ? el.parentElement : el;
  const uid = (_b = binding.instance) == null ? void 0 : _b.$.uid;
  if (!(target == null ? void 0 : target._touchHandlers) || !uid)
    return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const Touch$1 = Touch;
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false)
        return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": ["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover"
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b;
        return [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_b = slots.additional) == null ? void 0 : _b.call(slots, {
          group
        })];
      }
    }), [[resolveDirective("touch"), touchOptions.value]]));
    return {
      group
    };
  }
});
function useSsrBoot() {
  const isBooted = shallowRef(false);
  const ssrBootStyles = computed(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    Touch: Touch$1
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      var _a;
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit((_a = window.rootRef.value) == null ? void 0 : _a.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => {
        var _a;
        return [withDirectives(createVNode("div", {
          "class": ["v-window-item", groupItem.selectedClass.value, props.class],
          "style": props.style
        }, [hasContent.value && ((_a = slots.default) == null ? void 0 : _a.call(slots))]), [[vShow, groupItem.isSelected.value]])];
      }
    }));
    return {
      groupItem
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "resetPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const Reset = ref({
      email: "",
      password: "",
      verifyCode: ""
    });
    const step = ref(1);
    const withError = ref({
      displayError: false,
      msg: "",
      errorCode: 0
    });
    const dialoges = ref({
      success: false
    });
    const formRef = ref(null);
    const validationRules = ref(validation$1);
    const currentTitle = computed(() => {
      switch (step.value) {
        case 1:
          return "Forgot Password?";
        case 2:
          return "Verify Code";
        case 3:
          return "Reset Password";
        default:
          return '<div class="text-center">The Password Changed successfully </div>';
      }
    });
    const currentIcon = computed(() => {
      switch (step.value) {
        case 1:
          return "";
        case 2:
          return "";
        case 3:
          return "";
        default:
          return "mdi-check-bold";
      }
    });
    const currentPargraph = computed(() => {
      switch (step.value) {
        case 1:
          return "Enter your email to get a password reset link";
        case 2:
          return "Please Enter The Code You Have Received From Email";
        case 3:
          return "Please enter you new password";
        default:
          return "";
      }
    });
    const SendEmail = async () => {
      var _a;
      (_a = formRef.value) == null ? void 0 : _a.validate().then(async ({ valid: isValid }) => {
        if (isValid) {
          try {
            const { data } = await useFetch(
              "https://elkodaa.chd-staging.tech/api/c/auth/forgot-password"
            ).post(Reset.value).json();
            if (true) {
              step.value = 2;
            }
          } catch (error) {
            withError.value.displayError = true;
          }
        }
      });
    };
    const Verify = async () => {
      var _a;
      (_a = formRef.value) == null ? void 0 : _a.validate().then(async ({ valid: isValid }) => {
        if (isValid) {
          try {
            const { data } = await useFetch(
              "https://elkodaa.chd-staging.tech/api/c/auth/forgot-password"
            ).post(Reset.value).json();
            step.value = 3;
          } catch (error) {
            withError.value.displayError = true;
          }
        }
      });
    };
    const ChangePassword = async () => {
      var _a;
      (_a = formRef.value) == null ? void 0 : _a.validate().then(async ({ valid: isValid }) => {
        if (isValid) {
          try {
            const { data } = await useFetch(
              "https://elkodaa.chd-staging.tech/api/c/auth/forgot-password"
            ).post(Reset.value).json();
            if (true) {
              step.value = 4;
            }
          } catch (error) {
            withError.value.displayError = true;
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "primary fill-height" }, _attrs))}><div class="overlay py-6">`);
      _push(ssrRenderComponent(VCard, {
        class: "mx-auto my-12 py-8 px-3",
        "max-width": "500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VSheet, {
              "max-width": "440",
              class: "mx-auto"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(currentIcon)) {
                    _push3(`<div class="text-center mb-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VAvatar, {
                      color: "success",
                      size: "60"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, {
                            icon: unref(currentIcon),
                            size: "x-large"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, {
                              icon: unref(currentIcon),
                              size: "x-large"
                            }, null, 8, ["icon"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<h1 class="text-center text-h6"${_scopeId2}>${unref(currentTitle)}</h1>`);
                  _push3(ssrRenderComponent(VCardText, { class: "py-2 px-0 text-subtitle-1 text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(currentPargraph))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(currentPargraph)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VWindow, {
                    modelValue: step.value,
                    "onUpdate:modelValue": ($event) => step.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VWindowItem, { value: 1 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VForm, {
                                ref_key: "formRef",
                                ref: formRef
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="font-weight-bold d-inline-block px-0 ml-3 my-3"${_scopeId5}> Email </span>`);
                                    _push6(ssrRenderComponent(VTextField, {
                                      "aria-required": "true",
                                      label: "Enter Email",
                                      variant: "solo",
                                      modelValue: Reset.value.email,
                                      "onUpdate:modelValue": ($event) => Reset.value.email = $event,
                                      rules: validationRules.value.validation.emailRules,
                                      class: "my-2 px-1"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      block: "",
                                      class: "py-6",
                                      color: "subcolor",
                                      onClick: ($event) => SendEmail()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Reset Password `);
                                        } else {
                                          return [
                                            createTextVNode(" Reset Password ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardActions, { class: "justify-center" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span class="px-0 text-secondary"${_scopeId6}> Already have an account ? </span>`);
                                          _push7(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Login `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Login ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Login ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                            createVNode(_component_NuxtLink, { to: "/login" }, {
                                              default: withCtx(() => [
                                                createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", { class: "font-weight-bold d-inline-block px-0 ml-3 my-3" }, " Email "),
                                      createVNode(VTextField, {
                                        "aria-required": "true",
                                        label: "Enter Email",
                                        variant: "solo",
                                        modelValue: Reset.value.email,
                                        "onUpdate:modelValue": ($event) => Reset.value.email = $event,
                                        rules: validationRules.value.validation.emailRules,
                                        class: "my-2 px-1"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                      createVNode(VBtn, {
                                        block: "",
                                        class: "py-6",
                                        color: "subcolor",
                                        onClick: ($event) => SendEmail()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Reset Password ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(VCardActions, { class: "justify-center" }, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                          createVNode(_component_NuxtLink, { to: "/login" }, {
                                            default: withCtx(() => [
                                              createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VForm, {
                                  ref_key: "formRef",
                                  ref: formRef
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "font-weight-bold d-inline-block px-0 ml-3 my-3" }, " Email "),
                                    createVNode(VTextField, {
                                      "aria-required": "true",
                                      label: "Enter Email",
                                      variant: "solo",
                                      modelValue: Reset.value.email,
                                      "onUpdate:modelValue": ($event) => Reset.value.email = $event,
                                      rules: validationRules.value.validation.emailRules,
                                      class: "my-2 px-1"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                    createVNode(VBtn, {
                                      block: "",
                                      class: "py-6",
                                      color: "subcolor",
                                      onClick: ($event) => SendEmail()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Reset Password ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(VCardActions, { class: "justify-center" }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                        createVNode(_component_NuxtLink, { to: "/login" }, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VWindowItem, { value: 2 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VForm, {
                                ref_key: "formRef",
                                ref: formRef
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSheet, {
                                      class: "my-2 mx-auto",
                                      "max-width": "80%"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VOtpInput, {
                                            length: "6",
                                            variant: "solo",
                                            "hide-details": false,
                                            type: "number",
                                            modelValue: Reset.value.verifyCode,
                                            "onUpdate:modelValue": ($event) => Reset.value.verifyCode = $event,
                                            rules: validationRules.value.validation.numberRules
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VOtpInput, {
                                              length: "6",
                                              variant: "solo",
                                              "hide-details": false,
                                              type: "number",
                                              modelValue: Reset.value.verifyCode,
                                              "onUpdate:modelValue": ($event) => Reset.value.verifyCode = $event,
                                              rules: validationRules.value.validation.numberRules
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      block: "",
                                      "min-width": "50% !important",
                                      class: "py-6 mx-auto my-3 primary",
                                      color: "secondary",
                                      onClick: ($event) => Verify()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Verify Code `);
                                        } else {
                                          return [
                                            createTextVNode(" Verify Code ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardActions, { class: "justify-center" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span class="px-0 text-secondary"${_scopeId6}> Already have an account ? </span>`);
                                          _push7(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Login `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Login ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Login ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                            createVNode(_component_NuxtLink, { to: "/login" }, {
                                              default: withCtx(() => [
                                                createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VSheet, {
                                        class: "my-2 mx-auto",
                                        "max-width": "80%"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VOtpInput, {
                                            length: "6",
                                            variant: "solo",
                                            "hide-details": false,
                                            type: "number",
                                            modelValue: Reset.value.verifyCode,
                                            "onUpdate:modelValue": ($event) => Reset.value.verifyCode = $event,
                                            rules: validationRules.value.validation.numberRules
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        block: "",
                                        "min-width": "50% !important",
                                        class: "py-6 mx-auto my-3 primary",
                                        color: "secondary",
                                        onClick: ($event) => Verify()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Verify Code ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(VCardActions, { class: "justify-center" }, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                          createVNode(_component_NuxtLink, { to: "/login" }, {
                                            default: withCtx(() => [
                                              createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VForm, {
                                  ref_key: "formRef",
                                  ref: formRef
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSheet, {
                                      class: "my-2 mx-auto",
                                      "max-width": "80%"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VOtpInput, {
                                          length: "6",
                                          variant: "solo",
                                          "hide-details": false,
                                          type: "number",
                                          modelValue: Reset.value.verifyCode,
                                          "onUpdate:modelValue": ($event) => Reset.value.verifyCode = $event,
                                          rules: validationRules.value.validation.numberRules
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, {
                                      block: "",
                                      "min-width": "50% !important",
                                      class: "py-6 mx-auto my-3 primary",
                                      color: "secondary",
                                      onClick: ($event) => Verify()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Verify Code ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(VCardActions, { class: "justify-center" }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                        createVNode(_component_NuxtLink, { to: "/login" }, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VWindowItem, { value: 3 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VForm, {
                                ref_key: "formRef",
                                ref: formRef
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="font-weight-bold d-inline-block px-1 my-3"${_scopeId5}> New Password </span>`);
                                    _push6(ssrRenderComponent(VTextField, {
                                      label: "Enter New Password",
                                      variant: "solo",
                                      type: "password",
                                      class: "px-1",
                                      modelValue: Reset.value.password,
                                      "onUpdate:modelValue": ($event) => Reset.value.password = $event,
                                      rules: validationRules.value.validation.passowrdRules
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<span class="font-weight-bold d-inline-block px-1 my-3"${_scopeId5}> Repeat Password </span>`);
                                    _push6(ssrRenderComponent(VTextField, {
                                      label: "Repeat Password",
                                      variant: "solo",
                                      class: "px-1",
                                      type: "password",
                                      rules: validationRules.value.confirmPassword(Reset.value.password)
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      block: "",
                                      class: "py-6",
                                      color: "subcolor",
                                      onClick: ($event) => ChangePassword()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Change Password `);
                                        } else {
                                          return [
                                            createTextVNode(" Change Password ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardActions, { class: "justify-center" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span class="px-0 text-secondary"${_scopeId6}>Already have an account?</span>`);
                                          _push7(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VBtn, {
                                                  class: "px-0 text-capitalize",
                                                  color: "subcolor"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Login `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Login ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VBtn, {
                                                    class: "px-0 text-capitalize",
                                                    color: "subcolor"
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
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("span", { class: "px-0 text-secondary" }, "Already have an account?"),
                                            createVNode(_component_NuxtLink, { to: "/login" }, {
                                              default: withCtx(() => [
                                                createVNode(VBtn, {
                                                  class: "px-0 text-capitalize",
                                                  color: "subcolor"
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " New Password "),
                                      createVNode(VTextField, {
                                        label: "Enter New Password",
                                        variant: "solo",
                                        type: "password",
                                        class: "px-1",
                                        modelValue: Reset.value.password,
                                        "onUpdate:modelValue": ($event) => Reset.value.password = $event,
                                        rules: validationRules.value.validation.passowrdRules
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                      createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " Repeat Password "),
                                      createVNode(VTextField, {
                                        label: "Repeat Password",
                                        variant: "solo",
                                        class: "px-1",
                                        type: "password",
                                        rules: validationRules.value.confirmPassword(Reset.value.password)
                                      }, null, 8, ["rules"]),
                                      createVNode(VBtn, {
                                        block: "",
                                        class: "py-6",
                                        color: "subcolor",
                                        onClick: ($event) => ChangePassword()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Change Password ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(VCardActions, { class: "justify-center" }, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "px-0 text-secondary" }, "Already have an account?"),
                                          createVNode(_component_NuxtLink, { to: "/login" }, {
                                            default: withCtx(() => [
                                              createVNode(VBtn, {
                                                class: "px-0 text-capitalize",
                                                color: "subcolor"
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VForm, {
                                  ref_key: "formRef",
                                  ref: formRef
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " New Password "),
                                    createVNode(VTextField, {
                                      label: "Enter New Password",
                                      variant: "solo",
                                      type: "password",
                                      class: "px-1",
                                      modelValue: Reset.value.password,
                                      "onUpdate:modelValue": ($event) => Reset.value.password = $event,
                                      rules: validationRules.value.validation.passowrdRules
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                    createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " Repeat Password "),
                                    createVNode(VTextField, {
                                      label: "Repeat Password",
                                      variant: "solo",
                                      class: "px-1",
                                      type: "password",
                                      rules: validationRules.value.confirmPassword(Reset.value.password)
                                    }, null, 8, ["rules"]),
                                    createVNode(VBtn, {
                                      block: "",
                                      class: "py-6",
                                      color: "subcolor",
                                      onClick: ($event) => ChangePassword()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Change Password ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(VCardActions, { class: "justify-center" }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "px-0 text-secondary" }, "Already have an account?"),
                                        createVNode(_component_NuxtLink, { to: "/login" }, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, {
                                              class: "px-0 text-capitalize",
                                              color: "subcolor"
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VWindowItem, { value: 4 }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VForm, {
                                ref_key: "formRef",
                                ref: formRef
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSheet, {
                                      class: "my-2 mx-auto",
                                      "max-width": "80%"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_NuxtLink, {
                                            to: "/login",
                                            style: { "text-decoration": "none" }
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VBtn, {
                                                  block: "",
                                                  class: "py-6",
                                                  color: "secondary"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Let&#39;s go to login `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Let's go to login ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VBtn, {
                                                    block: "",
                                                    class: "py-6",
                                                    color: "secondary"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Let's go to login ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_NuxtLink, {
                                              to: "/login",
                                              style: { "text-decoration": "none" }
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VBtn, {
                                                  block: "",
                                                  class: "py-6",
                                                  color: "secondary"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Let's go to login ")
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
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardActions, { class: "justify-center" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span class="px-0 text-secondary"${_scopeId6}> Don&#39;t have account ? </span>`);
                                          _push7(ssrRenderComponent(_component_NuxtLink, { to: "/register" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VBtn, {
                                                  color: "subcolor",
                                                  class: "px-0 mx-2 text-capitalize"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Register `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Register ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VBtn, {
                                                    color: "subcolor",
                                                    class: "px-0 mx-2 text-capitalize"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Register ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("span", { class: "px-0 text-secondary" }, " Don't have account ? "),
                                            createVNode(_component_NuxtLink, { to: "/register" }, {
                                              default: withCtx(() => [
                                                createVNode(VBtn, {
                                                  color: "subcolor",
                                                  class: "px-0 mx-2 text-capitalize"
                                                }, {
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VSheet, {
                                        class: "my-2 mx-auto",
                                        "max-width": "80%"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtLink, {
                                            to: "/login",
                                            style: { "text-decoration": "none" }
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VBtn, {
                                                block: "",
                                                class: "py-6",
                                                color: "secondary"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Let's go to login ")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardActions, { class: "justify-center" }, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "px-0 text-secondary" }, " Don't have account ? "),
                                          createVNode(_component_NuxtLink, { to: "/register" }, {
                                            default: withCtx(() => [
                                              createVNode(VBtn, {
                                                color: "subcolor",
                                                class: "px-0 mx-2 text-capitalize"
                                              }, {
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VForm, {
                                  ref_key: "formRef",
                                  ref: formRef
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSheet, {
                                      class: "my-2 mx-auto",
                                      "max-width": "80%"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          to: "/login",
                                          style: { "text-decoration": "none" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, {
                                              block: "",
                                              class: "py-6",
                                              color: "secondary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Let's go to login ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardActions, { class: "justify-center" }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "px-0 text-secondary" }, " Don't have account ? "),
                                        createVNode(_component_NuxtLink, { to: "/register" }, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, {
                                              color: "subcolor",
                                              class: "px-0 mx-2 text-capitalize"
                                            }, {
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VWindowItem, { value: 1 }, {
                            default: withCtx(() => [
                              createVNode(VForm, {
                                ref_key: "formRef",
                                ref: formRef
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "font-weight-bold d-inline-block px-0 ml-3 my-3" }, " Email "),
                                  createVNode(VTextField, {
                                    "aria-required": "true",
                                    label: "Enter Email",
                                    variant: "solo",
                                    modelValue: Reset.value.email,
                                    "onUpdate:modelValue": ($event) => Reset.value.email = $event,
                                    rules: validationRules.value.validation.emailRules,
                                    class: "my-2 px-1"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                  createVNode(VBtn, {
                                    block: "",
                                    class: "py-6",
                                    color: "subcolor",
                                    onClick: ($event) => SendEmail()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Reset Password ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(VCardActions, { class: "justify-center" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                      createVNode(_component_NuxtLink, { to: "/login" }, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                          }),
                          createVNode(VWindowItem, { value: 2 }, {
                            default: withCtx(() => [
                              createVNode(VForm, {
                                ref_key: "formRef",
                                ref: formRef
                              }, {
                                default: withCtx(() => [
                                  createVNode(VSheet, {
                                    class: "my-2 mx-auto",
                                    "max-width": "80%"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VOtpInput, {
                                        length: "6",
                                        variant: "solo",
                                        "hide-details": false,
                                        type: "number",
                                        modelValue: Reset.value.verifyCode,
                                        "onUpdate:modelValue": ($event) => Reset.value.verifyCode = $event,
                                        rules: validationRules.value.validation.numberRules
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    block: "",
                                    "min-width": "50% !important",
                                    class: "py-6 mx-auto my-3 primary",
                                    color: "secondary",
                                    onClick: ($event) => Verify()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Verify Code ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(VCardActions, { class: "justify-center" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                      createVNode(_component_NuxtLink, { to: "/login" }, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                          }),
                          createVNode(VWindowItem, { value: 3 }, {
                            default: withCtx(() => [
                              createVNode(VForm, {
                                ref_key: "formRef",
                                ref: formRef
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " New Password "),
                                  createVNode(VTextField, {
                                    label: "Enter New Password",
                                    variant: "solo",
                                    type: "password",
                                    class: "px-1",
                                    modelValue: Reset.value.password,
                                    "onUpdate:modelValue": ($event) => Reset.value.password = $event,
                                    rules: validationRules.value.validation.passowrdRules
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                  createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " Repeat Password "),
                                  createVNode(VTextField, {
                                    label: "Repeat Password",
                                    variant: "solo",
                                    class: "px-1",
                                    type: "password",
                                    rules: validationRules.value.confirmPassword(Reset.value.password)
                                  }, null, 8, ["rules"]),
                                  createVNode(VBtn, {
                                    block: "",
                                    class: "py-6",
                                    color: "subcolor",
                                    onClick: ($event) => ChangePassword()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Change Password ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(VCardActions, { class: "justify-center" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "px-0 text-secondary" }, "Already have an account?"),
                                      createVNode(_component_NuxtLink, { to: "/login" }, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, {
                                            class: "px-0 text-capitalize",
                                            color: "subcolor"
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
                          }),
                          createVNode(VWindowItem, { value: 4 }, {
                            default: withCtx(() => [
                              createVNode(VForm, {
                                ref_key: "formRef",
                                ref: formRef
                              }, {
                                default: withCtx(() => [
                                  createVNode(VSheet, {
                                    class: "my-2 mx-auto",
                                    "max-width": "80%"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        to: "/login",
                                        style: { "text-decoration": "none" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, {
                                            block: "",
                                            class: "py-6",
                                            color: "secondary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Let's go to login ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardActions, { class: "justify-center" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "px-0 text-secondary" }, " Don't have account ? "),
                                      createVNode(_component_NuxtLink, { to: "/register" }, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, {
                                            color: "subcolor",
                                            class: "px-0 mx-2 text-capitalize"
                                          }, {
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    unref(currentIcon) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center mb-3"
                    }, [
                      createVNode(VAvatar, {
                        color: "success",
                        size: "60"
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, {
                            icon: unref(currentIcon),
                            size: "x-large"
                          }, null, 8, ["icon"])
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    createVNode("h1", {
                      class: "text-center text-h6",
                      innerHTML: unref(currentTitle)
                    }, null, 8, ["innerHTML"]),
                    createVNode(VCardText, { class: "py-2 px-0 text-subtitle-1 text-center" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(currentPargraph)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VWindow, {
                      modelValue: step.value,
                      "onUpdate:modelValue": ($event) => step.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(VWindowItem, { value: 1 }, {
                          default: withCtx(() => [
                            createVNode(VForm, {
                              ref_key: "formRef",
                              ref: formRef
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "font-weight-bold d-inline-block px-0 ml-3 my-3" }, " Email "),
                                createVNode(VTextField, {
                                  "aria-required": "true",
                                  label: "Enter Email",
                                  variant: "solo",
                                  modelValue: Reset.value.email,
                                  "onUpdate:modelValue": ($event) => Reset.value.email = $event,
                                  rules: validationRules.value.validation.emailRules,
                                  class: "my-2 px-1"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                createVNode(VBtn, {
                                  block: "",
                                  class: "py-6",
                                  color: "subcolor",
                                  onClick: ($event) => SendEmail()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Reset Password ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(VCardActions, { class: "justify-center" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                    createVNode(_component_NuxtLink, { to: "/login" }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                        }),
                        createVNode(VWindowItem, { value: 2 }, {
                          default: withCtx(() => [
                            createVNode(VForm, {
                              ref_key: "formRef",
                              ref: formRef
                            }, {
                              default: withCtx(() => [
                                createVNode(VSheet, {
                                  class: "my-2 mx-auto",
                                  "max-width": "80%"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VOtpInput, {
                                      length: "6",
                                      variant: "solo",
                                      "hide-details": false,
                                      type: "number",
                                      modelValue: Reset.value.verifyCode,
                                      "onUpdate:modelValue": ($event) => Reset.value.verifyCode = $event,
                                      rules: validationRules.value.validation.numberRules
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  block: "",
                                  "min-width": "50% !important",
                                  class: "py-6 mx-auto my-3 primary",
                                  color: "secondary",
                                  onClick: ($event) => Verify()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Verify Code ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(VCardActions, { class: "justify-center" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                    createVNode(_component_NuxtLink, { to: "/login" }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                        }),
                        createVNode(VWindowItem, { value: 3 }, {
                          default: withCtx(() => [
                            createVNode(VForm, {
                              ref_key: "formRef",
                              ref: formRef
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " New Password "),
                                createVNode(VTextField, {
                                  label: "Enter New Password",
                                  variant: "solo",
                                  type: "password",
                                  class: "px-1",
                                  modelValue: Reset.value.password,
                                  "onUpdate:modelValue": ($event) => Reset.value.password = $event,
                                  rules: validationRules.value.validation.passowrdRules
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " Repeat Password "),
                                createVNode(VTextField, {
                                  label: "Repeat Password",
                                  variant: "solo",
                                  class: "px-1",
                                  type: "password",
                                  rules: validationRules.value.confirmPassword(Reset.value.password)
                                }, null, 8, ["rules"]),
                                createVNode(VBtn, {
                                  block: "",
                                  class: "py-6",
                                  color: "subcolor",
                                  onClick: ($event) => ChangePassword()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Change Password ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(VCardActions, { class: "justify-center" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "px-0 text-secondary" }, "Already have an account?"),
                                    createVNode(_component_NuxtLink, { to: "/login" }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          class: "px-0 text-capitalize",
                                          color: "subcolor"
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
                        }),
                        createVNode(VWindowItem, { value: 4 }, {
                          default: withCtx(() => [
                            createVNode(VForm, {
                              ref_key: "formRef",
                              ref: formRef
                            }, {
                              default: withCtx(() => [
                                createVNode(VSheet, {
                                  class: "my-2 mx-auto",
                                  "max-width": "80%"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      to: "/login",
                                      style: { "text-decoration": "none" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          block: "",
                                          class: "py-6",
                                          color: "secondary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Let's go to login ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardActions, { class: "justify-center" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "px-0 text-secondary" }, " Don't have account ? "),
                                    createVNode(_component_NuxtLink, { to: "/register" }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          color: "subcolor",
                                          class: "px-0 mx-2 text-capitalize"
                                        }, {
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
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
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
                  unref(currentIcon) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center mb-3"
                  }, [
                    createVNode(VAvatar, {
                      color: "success",
                      size: "60"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, {
                          icon: unref(currentIcon),
                          size: "x-large"
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true),
                  createVNode("h1", {
                    class: "text-center text-h6",
                    innerHTML: unref(currentTitle)
                  }, null, 8, ["innerHTML"]),
                  createVNode(VCardText, { class: "py-2 px-0 text-subtitle-1 text-center" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(currentPargraph)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VWindow, {
                    modelValue: step.value,
                    "onUpdate:modelValue": ($event) => step.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(VWindowItem, { value: 1 }, {
                        default: withCtx(() => [
                          createVNode(VForm, {
                            ref_key: "formRef",
                            ref: formRef
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "font-weight-bold d-inline-block px-0 ml-3 my-3" }, " Email "),
                              createVNode(VTextField, {
                                "aria-required": "true",
                                label: "Enter Email",
                                variant: "solo",
                                modelValue: Reset.value.email,
                                "onUpdate:modelValue": ($event) => Reset.value.email = $event,
                                rules: validationRules.value.validation.emailRules,
                                class: "my-2 px-1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                              createVNode(VBtn, {
                                block: "",
                                class: "py-6",
                                color: "subcolor",
                                onClick: ($event) => SendEmail()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Reset Password ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(VCardActions, { class: "justify-center" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                  createVNode(_component_NuxtLink, { to: "/login" }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                      }),
                      createVNode(VWindowItem, { value: 2 }, {
                        default: withCtx(() => [
                          createVNode(VForm, {
                            ref_key: "formRef",
                            ref: formRef
                          }, {
                            default: withCtx(() => [
                              createVNode(VSheet, {
                                class: "my-2 mx-auto",
                                "max-width": "80%"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VOtpInput, {
                                    length: "6",
                                    variant: "solo",
                                    "hide-details": false,
                                    type: "number",
                                    modelValue: Reset.value.verifyCode,
                                    "onUpdate:modelValue": ($event) => Reset.value.verifyCode = $event,
                                    rules: validationRules.value.validation.numberRules
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                block: "",
                                "min-width": "50% !important",
                                class: "py-6 mx-auto my-3 primary",
                                color: "secondary",
                                onClick: ($event) => Verify()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Verify Code ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(VCardActions, { class: "justify-center" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "px-0 text-secondary" }, " Already have an account ? "),
                                  createVNode(_component_NuxtLink, { to: "/login" }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, { class: "px-0 text-capitalize text-subcolor" }, {
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
                      }),
                      createVNode(VWindowItem, { value: 3 }, {
                        default: withCtx(() => [
                          createVNode(VForm, {
                            ref_key: "formRef",
                            ref: formRef
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " New Password "),
                              createVNode(VTextField, {
                                label: "Enter New Password",
                                variant: "solo",
                                type: "password",
                                class: "px-1",
                                modelValue: Reset.value.password,
                                "onUpdate:modelValue": ($event) => Reset.value.password = $event,
                                rules: validationRules.value.validation.passowrdRules
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                              createVNode("span", { class: "font-weight-bold d-inline-block px-1 my-3" }, " Repeat Password "),
                              createVNode(VTextField, {
                                label: "Repeat Password",
                                variant: "solo",
                                class: "px-1",
                                type: "password",
                                rules: validationRules.value.confirmPassword(Reset.value.password)
                              }, null, 8, ["rules"]),
                              createVNode(VBtn, {
                                block: "",
                                class: "py-6",
                                color: "subcolor",
                                onClick: ($event) => ChangePassword()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Change Password ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(VCardActions, { class: "justify-center" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "px-0 text-secondary" }, "Already have an account?"),
                                  createVNode(_component_NuxtLink, { to: "/login" }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        class: "px-0 text-capitalize",
                                        color: "subcolor"
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
                      }),
                      createVNode(VWindowItem, { value: 4 }, {
                        default: withCtx(() => [
                          createVNode(VForm, {
                            ref_key: "formRef",
                            ref: formRef
                          }, {
                            default: withCtx(() => [
                              createVNode(VSheet, {
                                class: "my-2 mx-auto",
                                "max-width": "80%"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, {
                                    to: "/login",
                                    style: { "text-decoration": "none" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        block: "",
                                        class: "py-6",
                                        color: "secondary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Let's go to login ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCardActions, { class: "justify-center" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "px-0 text-secondary" }, " Don't have account ? "),
                                  createVNode(_component_NuxtLink, { to: "/register" }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        color: "subcolor",
                                        class: "px-0 mx-2 text-capitalize"
                                      }, {
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
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
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
        timeout: 2e3,
        value: true,
        fixed: "",
        bottom: "",
        color: "success",
        elevation: "24",
        modelValue: dialoges.value.success,
        "onUpdate:modelValue": ($event) => dialoges.value.success = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}> The Password Changed successfully `);
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
                createTextVNode(" The Password Changed successfully "),
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=resetPassword-1709bf42.mjs.map
