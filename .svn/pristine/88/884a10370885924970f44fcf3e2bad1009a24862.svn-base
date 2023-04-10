<template>
	<div class="register-body">
		<div class="register">
			<div class="login_main_item">
				<div class="login_main_title"><span>用户注册</span></div>
				<div class="login_main_list">
					<Form ref="loginForm" :model="loginForm" :rules="ruleForm">
						<FormItem prop="displayname">
							<Input
								type="text"
								v-model="loginForm.displayname"
								placeholder="姓名"
								autocomplete="off"
								size="large"
							/>
						</FormItem>
						<FormItem prop="account">
							<Input
								type="text"
								autocomplete="off"
								v-model="loginForm.account"
								placeholder="用户名"
								size="large"
							/>
						</FormItem>
						<FormItem prop="password">
							<Input
								autocomplete="off"
								v-model="loginForm.password"
								placeholder="密码"
								size="large"
							/>
						</FormItem>
						<div class="rate">
							<div class="ruo"></div>
							<div class="zhong"></div>
							<div class="qiang"></div>
							<p>强</p>
						</div>
						<FormItem prop="phonemobile">
							<Input
								v-model="loginForm.phonemobile"
								placeholder="手机号码"
								size="large"
							/>
						</FormItem>
						<FormItem prop="phoneoffice">
							<Input
								type="tel"
								v-model="loginForm.phoneoffice"
								placeholder="电话号码"
								size="large"
							/>
						</FormItem>
						<FormItem prop="email">
							<Input
								type="email"
								v-model="loginForm.email"
								placeholder="E-mail"
								size="large"
							/>
						</FormItem>
						<FormItem>
							<Cascader
								:data="dwBmList"
								placeholder="单位/部门"
								@on-change="changeBm"
							></Cascader>
						</FormItem>
						<FormItem>
							<Select
								v-model="loginForm.areaIds"
								placeholder="所属片区"
								clearable
								multiple
							>
								<Option
									v-for="item in pqList"
									:key="item.id"
									:value="item.id"
									>{{ item.name }}</Option
								>
							</Select>
						</FormItem>
						<FormItem prop="description">
							<Input
								v-model="loginForm.description"
								placeholder="备注"
								size="large"
							/>
						</FormItem>
						<FormItem>
							<Button
								type="primary"
								size="large"
								long
								@click="submit('loginForm')"
								>注 册</Button
							>
						</FormItem>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import qs from "qs";
import { Vue, Component } from "vue-property-decorator";
import {
	FormItem,
	Icon,
	Form,
	Input,
	Button,
	Select,
	Option,
	Cascader,
	Rate,
} from "iview";

const validPhone: any = (rule: any, value: string, callback: Function) => {
	if (value) {
		let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
		const valueRe = new RegExp(reg);
		if (valueRe.test(value)) {
			callback();
		} else {
			callback(new Error("手机号码格式不正确"));
		}
	} else {
		callback(new Error("手机号码不能为空"));
	}
};
const validTel: any = (rule: any, value: string, callback: Function) => {
	if (value) {
		let reg = /^(?:\d{3}-)?\d{8}$|^(?:\d{4}-)?\d{7,8}$/;
		const valueRe = new RegExp(reg);
		if (valueRe.test(value)) {
			callback();
		} else {
			callback(new Error("请填写正确的电话号码格式"));
		}
	} else {
		callback();
	}
};
const validEmail: any = (rule: any, value: string, callback: Function) => {
	if (value) {
		let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const valueRe = new RegExp(reg);
		if (valueRe.test(value)) {
			callback();
		} else {
			callback(new Error("e-mail格式不正确"));
		}
	} else {
		callback();
	}
};
@Component({
	components: {
		FormItem,
		Icon,
		Form,
		Input,
		Button,
		Select,
		Option,
		Cascader,
		Rate,
	},
})
export default class login extends Vue {
	passQd:any = 2;
	note:any = '';
	valueCustomText:string='cehsi';
	rateColor:string = 'red';
	loginForm: any = {
		account: "",
		areaIds: [], //片区
		department: "", //部门
		departmentId: "",
		description: "",
		devOpsId: "", //运维单位
		displayname: "", //姓名
		email: "",
		password: "",
		phonemobile: "",
		phoneoffice: "",
	};
	validPassword :any = (rule: any, value: string, callback: Function) => {
		if (value) {
			//密码为八位及以上并且大小写字母数字特殊字符三项都包括
			var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
			//密码为八位及以上并且大小写字母、数字、特殊字符三项中有两项，强度是中等
			var mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*\\W))|((?=.*[0-9])(?=.*\\W))|((?=.*[A-Z])(?=.*\\W))).*$", "g");
			var enoughRegex = new RegExp("(?=.{8,}).*", "g");
			if(strongRegex.test(value)) {
				this.note='当前密码强度：强;'
			} else if (mediumRegex.test(value)){
				this.note='当前密码强度：中等;'
			} else if(enoughRegex.test(value)){
				this.note='当前密码强度：弱;'
			}
		}
		else{
			this.note=''
			// callback(new Error("请输入长度至少为8位包含大小写字母、数字的密码"));
			callback(new Error("密码不能为空!"));
		}
	}
	ruleForm: any = {
		account: [
			{ required: true, message: "用户名不能为空", trigger: "blur" },
		],
		displayname: [
			{ required: true, message: "姓名不能为空", trigger: "blur" },
		],
		password: [
			{ required: true, validator: this.validPassword, trigger: "blur" },
		],
		phonemobile: [
			{ required: true, validator: validPhone, trigger: "blur" },
		],
		areaId: [{ required: false }],
		department: [{ required: false }],
		departmentId: [{ required: false }],
		description: [{ required: false }],
		devOpsId: [{ required: false }],
		email: [{ validator: validEmail, message: "请输入正确的email格式" }],
		phoneoffice: [{ validator: validTel, message: "请输入正确的电话格式" }],
	};
	bmList: any[] = [];
	dwList: any[] = [];
	get dwBmList() {
		return [
			{
				value: "1",
				label: "单位",
				children: this.dwList,
			},
			{
				value: "2",
				label: "部门",
				children: this.bmList,
			},
		];
	}
	pqList: any[] = [];

	//   运维单位
	async getYwdw() {
		this.$base.get("jnsw/base/ywdwList").then((res: any) => {
			this.dwList = res.data.map((arr: any) => {
				return {
					value: arr[0],
					label: arr[1],
				};
			});
		});
	}
	//   部门
	async getBm() {
		this.$base.get("jnsw/base/bmList").then((res: any) => {
			this.bmList = res.data.map((arr: any) => {
				return {
					value: arr[0],
					label: arr[1],
				};
			});
		});
	}
	// 片区
	async getPq() {
		this.$base.get("jnsw/base/pqList").then((res: any) => {
			this.pqList = res.data.map((arr: any) => {
				return {
					id: arr[0],
					name: arr[1],
				};
			});
		});
	}
	changeBm(value: any[]) {
		if (value.length) {
			if (value[0] == "1") {
				this.loginForm.devOpsId = value[1];
				this.loginForm.department = "";
				this.loginForm.departmentId = "";
			} else {
				let item = this.bmList.filter(
					(item: any) => item.value == value[1]
				);
				this.loginForm.departmentId = value[1];
				this.loginForm.department = item[0].label;
				this.loginForm.devOpsId = "";
			}
		}
	}
	// 注册
	register() {
		this.$base
			.post("jnsw/user/register", this.loginForm)
			.then((res: any) => {
				if (res.data.message == "注册成功") {
					this.$Message.info(res.data.message);
					this.$router.push("/login");
				} else {
					this.$Message.info(res.data.message);
				}
			})
			.catch((err: any) => {
				this.$Message.info(err.response.data.message);
			});
	}
	submit(name: string) {
		let data: any = this.$refs[name];

		data.validate((valid: any) => {
			if (valid) {
				this.register();
			} else {
			}
		});
	}
	mounted() {
		this.getYwdw();
		this.getBm();
		this.getPq();
	}
}
</script>
<style lang="scss" scoped>
.register-body {
	display: flex;
	justify-content: center;
	align-items: center;
	background: url("../assets/login/bg.jpg") no-repeat fixed center;
	background-size: cover;
	width: 100%;
	height: 100%;
	.register {
		width: 460px;
		// height: 460px;
		border-radius: 8px;
		padding: 0 40px;
		background-color: rgb(255, 255, 255);
		// box-shadow: 0 4px 10px rgba(0, 0, 0, 0.22);
	}
	.login_main_title {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100px;
		font-size: 26px;
		color: #37415f;
		//   background: url('../assets/login/title.png') no-repeat;
		//   background-position: center;
	}
	.rate{
		text-align: right;
		margin-top: -20px;
		margin-bottom: 10px;
		div{
			width: 60px;
			height: 20px;
			display: inline-block;
			border: 1px solid #ccc;
			margin-right: 10;
		}
		p{
			margin-left: 10px;
			display: inline-block;
			height: 20px;
			line-height: 20px;
			align-items: center;
		}
	}
}
</style>
