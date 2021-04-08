import { h } from "vue";

export default function (props, context) {
  console.log(props, context);
  return h(
    "div",
    {
      onclick: () => {
        context.emit("update:count", props.count + 1);
      },
    },
    [
        `${props.count}`, 
        context.slots.default()
    ]
  );
}
