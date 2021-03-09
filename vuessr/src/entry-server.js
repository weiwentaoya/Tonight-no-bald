import { createApp } from './main';

export default context =>{
    const {app} = createApp(context)
    return new Promise((resovlve, reject)=>{
        resovlve(app)
    })
}