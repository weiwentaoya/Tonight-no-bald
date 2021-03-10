import { createApp } from './main';

export default context =>{
    const {app, router, store} = createApp(context)
    return new Promise((resovlve, reject)=>{
        router.push(context.url)

        router.onReady(()=>{
            const comps = router.getMatchedComponents()
            Promise.all(comps.map(comp=>{
                if (comp.asyncData) {
                    return comp.asyncData({route:router.currentRoute, store})
                }
            })).then(()=>{
                context.state = store.state
                resovlve(app)
            }).catch(reject)
            
        },reject)
    })
}