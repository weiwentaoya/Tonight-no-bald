<template>
    <div>
        <p>{{msg}}</p>
        <Form :model="userForm" :rules="rules" ref="userFormRef">
            <FormItem label="用户名" prop="userName">
                <FormInput v-model="userForm.userName" placeholder="请输入用户名"/>
            </FormItem>
            <FormItem label="密码" prop="passWord">
                <FormInput v-model="userForm.passWord" placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
                <button @click="submit">提交</button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import FormInput from "@/components/form/FormInput.vue"
    import FormItem from "@/components/form/FormItem.vue"
    import Form from "@/components/form/Form.vue"
    import Alert from "@/components/alert.vue"
    import create from "@/utils/create.js"
    
    // console.log(create);
    export default {
        components:{
            FormInput,
            FormItem,
            Form,
        },
        data(){
            return{
                userForm:{
                    userName: 'userName',
                    passWord: 'passWord',
                },
                rules:{
                    userName: [
                        { required: true, message: '请输入用户名称'},
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
                    ],
                    passWord: [
                        { required: true, message: '请输入密码'},
                    ],
                },
                msg: 'hello'
            }
        },
        methods: {
            submit() {
                this.$refs.userFormRef.validate((valid) => {
                    create(Alert,{title: '早上八点半好困啊',message: valid?'表单验证成功！':'表单验证失败！'})
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>