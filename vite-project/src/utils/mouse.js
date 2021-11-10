import {ref, onMounted, onUnmounted} from 'vue'
export default function useMouse(){
    const x = ref(0)
    const y = ref(0)
    function update(e){
        x.value = e.pageX
        y.value = e.pageY
        console.log(x.value, y.value);

    }
    onMounted(()=>{
        window.addEventListener('mousemove',update)
    })
    onUnmounted(()=>{
        window.removeEventListener('mousemove',update)
    })
    return {x,y}
}