let debug = true;
let siteInfo = {};
let dev = 0 // 是否是体验模式 1是  0不是
if (debug) {
	siteInfo = {
		"siteroot": "https://www.maishijie.com.cn/" // https://www.maishijie.com.cn/
	}
} else {
	siteInfo = {
		"siteroot": "https://www.maishijie.com.cn/"
	}
}

function toQueryString(obj) {
	if (!obj) return "";
	return cleanArray(
		Object.keys(obj).map(key => {
			if (obj[key] === undefined) return "";
			return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
		})
	).join("&");
}

export function decodeScene(scene) {
	scene = decodeURIComponent(scene)
	let arr1 = scene.split('&')
	let arr2 = []
	let options = {}
	arr1.forEach((item) => {
		arr2 = item.split('=')
		options[arr2[0]] = arr2[1]
	})
	return options
}

export function domain() {
	let url = siteInfo.siteroot
	let arr = url.split('/')
	return arr[0] + '//' + arr[2]
}

export function iphoneXBottomHeight() {
	try {
		var res = uni.getSystemInfoSync();
		var iPhoneXBottom = 0;
		res.model = res.model.replace(' ', '');
		res.model = res.model.toLowerCase();
		if (res.model.indexOf('iphonex') != -1 || res.model.indexOf('iphone11') != -1) {
			iPhoneXBottom = 50;
		} else {
			iPhoneXBottom = 0;
		}
		return uni.upx2px(iPhoneXBottom);
	} catch (e) {
		return 0;
	}
}

export function isTab(path) {
	let list = [{
			"pagePath": "/pages/index/index",
		},
		{
			"pagePath": "/pages/goods/out",
		}
	]
	for (let i = 0; i < list.length; i++) {
		if (list[i].pagePath == path) {
			return true
		}
	}
	return false
}

export function reBuildUrl(url) {
	let baseUrl = siteInfo.siteroot;
	let arr = url.split('/');
	baseUrl += arr[0] + '-';
	if (arr[1]) {
		baseUrl += arr[1] + '.htm';
	}
	let userInfo = uni.getStorageSync('userInfo');
	let tokens = uni.getStorageSync('token')
	let token = !userInfo ? tokens : userInfo.token;
	baseUrl += '?token=';
	baseUrl += token;
	return baseUrl
}

function cleanArray(actual) {
	const newArray = [];
	for (let i = 0; i < actual.length; i++) {
		if (actual[i]) {
			newArray.push(actual[i]);
		}
	}
	return newArray;
}

function request(url, method, data, showLoading = true) {
	return new Promise((resolve, reject) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中...'
			});
		}

		data = data || {};
    if (data.schoolid) {
			schoolid = data.schoolid
		}
		data = toQueryString(data)


		let schoolInfo = uni.getStorageSync('getSchoolLocation');
		let schoolid;
		if (schoolInfo && schoolInfo.schoolid) {
			schoolid = schoolInfo.schoolid;
		}
		uni.request({
			url: reBuildUrl(url) + '&isdev=' + dev + '&schoolid=' + schoolid,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data || {},
			method: method || 'GET',
			success(res) {
				if (showLoading) {
					uni.hideLoading();
				}
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					var title = res.errMsg;
					showToast(title); //提示信息
					reject();
				}
			},
			fail() {
				if (showLoading) {
					uni.hideLoading();
				}
			}
		});
	})
}

export function requestDefault(url, method, data, showLoading = true) {
	return new Promise((resolve, reject) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中...'
			});
		}
		uni.request({
			url: url,
			data: data || {},
			method: method || 'GET',
			success(res) {
				if (showLoading) {
					uni.hideLoading();
				}
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					var title = res.errMsg;
					showToast(title); //提示信息
					reject();
				}
			},
			fail() {
				if (showLoading) {
					uni.hideLoading();
				}
			}
		});
	})
}

//toast提示信息
export function showToast(title, icon = 'none') {
	uni.showToast({
		title: title.toString(),
		icon
	});
}

//modal
export function showModal(content) {
	uni.showModal({
		content: content
	});
}

//提示功能开发中...
export function showTipPending() {
	showToast('功能开发中...');
}

export function get(url, data, showLoading = true) {
	return request(url, 'GET', data, showLoading);
}

export function post(url, data, showLoading = true) {
	return request(url, 'POST', data, showLoading);
}


//根据key获取storage
export function getLocalStorage(key) {
	return uni.getStorageSync(key);
}

//根据key删除storage
export function removeLocalStorage(key) {
	return uni.removeStorageSync(key);
}

//根据key value设置storage
export function setLocalStorage(key, value) {
	uni.setStorageSync(key, value);
}

//将日期小于10的转为两位数，  9-> 09
export function numberDouble(num) {
	return num < 10 ? '0' + num : num;
}

//将时间戳转为日期时间
export function forMatDate(date, default_val = true) { //中国标准时间对象
	date = date * 1000;
	date = parseInt(date);
	var time = new Date(date);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return numberDouble(m) + '-' + numberDouble(d) + ' ' + numberDouble(h) + ':' + numberDouble(mm) + ':' +
		numberDouble(s);
	return date;
}


//复制数据
export function copyClipBoardData(data) {
	return new Promise((resolve, reject) => {
		uni.setClipboardData({
			data: data,
			success() {
				showToast('复制成功', 'success');
				resolve();
			},
			fail() {
				showToast('复制失败，请重试');
			}
		});
	});
}


//上传单张图片
export function uploadFile(file) {
	uni.showLoading({
		title: '上传中...'
	});
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: reBuildUrl(uploadFileUrl),
			filePath: file,
			name: 'file',
			formData: {},
			header: {
				"Content-Type": "multipart/form-data"
			},
			success(res) {
				//console.log(res);
				uni.hideLoading();
				if (res.statusCode == 200) {
					let data = JSON.parse(res.data);
					if (data.code == 0) {
						resolve({
							msg: 'ok',
							data: data.data
						});
					} else {
						resolve({
							msg: 'fail'
						});
					}
				} else {
					resolve({
						msg: 'fail'
					});
				}
			},
			fail(err) {
				console.log(err);
				resolve({
					msg: 'fail'
				});
			}
		});
	});
};

//上传多张图片
export function uploadMulFiles(files) {
	return new Promise((resolve, reject) => {
		let filesLen = files.length;
		let count = 0;
		let pathsArr = []; //返回的图品地址
		upload();

		function upload() {
			if (count < filesLen) {
				uploadFile(files[count])
					.then((res) => {
						if (res.msg == 'ok') {
							pathsArr.push(res.data);
							count++;
							upload();
						} else {
							resolve({
								msg: 'fail'
							});
						}
					});
			} else {
				uni.hideLoading();
				resolve({
					msg: 'ok',
					data: pathsArr
				});
			}
		}
	});
}


//获取机型的状态栏和标题栏高度
export function getTitleBarHeight() {
	let result = uni.getSystemInfoSync();
	let totalTopHeight = 68;
	if (result.model.indexOf('iPhone X') != -1) {
		totalTopHeight = 88;
	} else if (result.model.indexOf('iPhone') != -1) {
		totalTopHeight = 64;
	};
	let titleBarHeight = totalTopHeight - result.statusBarHeight;
	return {
		totalTopHeight, //总高度
		titleBarHeight, //标题栏高度
		statusBarHeight: result.statusBarHeight, //状态栏高度
		isIpx: result.model.indexOf('iPhone X') != -1 //是否是iphoneX
	}
};


//获取机型判断是ios还是android
export function getSystemIsIOS() {
	let result = uni.getSystemInfoSync();
	return result.system.toLowerCase().indexOf('ios') != -1;
}


//支微信付函数
export function wx_pay(data) {
	return new Promise((resolve, reject) => {
		//微信小程序支付
		//#ifdef MP-WEIXIN
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success(res) {
				showToast('支付成功', 'success');

				resolve();
			},
			fail(res) {
				console.log(res);
				showToast('支付失败,请重试');

				reject();
			}
		});
		//#endif
		//H5+app
		//#ifdef APP-PLUS
		uni.requestPayment({
			provider: 'wxpay',
			orderInfo: JSON.stringify(data),
			success(res) {
				showToast('支付成功', 'success');
				resolve();
			},
			fail(res) {
				showToast('支付失败,请重试');
				reject();
			}
		});
		//#endif
	});
}


//检查手机号
export function checkPhone(phone) {
	if (!phone) {
		return false;
	};
	if (!/^1\d{10}$/g.test(phone)) {
		return false;
	};
	return true;
}

export function getQuery(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}

export function formatSeconds(value) {
	if (value == undefined) {
		value = 0;
	}
	var second = parseInt(value); // 秒
	var min = 0; // 分
	var hour = 0; // 小时
	if (second > 60) {
		min = parseInt(second / 60);
		second = parseInt(second % 60);
		if (min > 60) {
			hour = parseInt(min / 60);
			min = parseInt(min % 60);
		}
	}
	var secondVal = parseInt(second)
	var minVal = parseInt(min)
	var hourVal = parseInt(hour)
	if (hourVal > 0 || minVal > 0) {
		var secondVal = 0
	}
	var result = ""
	if (secondVal > 0) {
		result += "" + secondVal + "秒";
	}
	if (minVal > 0) {
		result = "" + minVal + "分" + result;
	}
	if (hourVal > 0) {
		result = "" + hourVal + "时" + result;
	}
	return result;
}

export function formatSecondsHis(result) {
	//var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	//var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
	//return result = m + ":" + s;
	let timestamp = result * 1000;
	var date = new Date(parseInt(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':';
	var m = (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':';
	var s = (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds());
	return h + m + s;

}
export function timestampToTime(data) {

	var s;
	console.log(data);
	data = data * 1000;
	var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = (data % (1000 * 60)) / 1000;
	s = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ?
		(
			'0' + seconds) : seconds);
	return s;


}
export function isFile(path) {
	let f = wx.getFileSystemManager()
	return new Promise((resolve, reject) => {
		try {
			f.accessSync(path)
			resolve(true)
		} catch (e) {
			resolve(false)
		}
	})
}

export function downloadImg(img) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: img,
			success(res) {
				if (res.statusCode === 200) {
					resolve(res.tempFilePath);
				} else {
					resolve();
				}
			},
			fail() {
				showToast('下载失败，请刷新重试');
			}
		})
	});
}
/** 关闭当前页面传参到上一个页面
 * parent_fun_name 上一个页面对应函数名称  async 方法旋转不到
 * params 参数
 * prev 前第几个页面
 * delay 延迟关闭当前页面的时间
 * 返回页调用方法 parent_fun_name(data){}
 */
export function goBack(parent_fun_name, params, prev = 1, delay = 10) {
	var pages = getCurrentPages();
	var prevPage = pages[pages.length - (1 + prev)];
	parent_fun_name && prevPage.$vm[parent_fun_name] && prevPage.$vm[parent_fun_name](params)
	setTimeout(() => {
		uni.navigateBack()
	}, delay)
}


/**
 * 求小数点后的数据长度
 */
function deal(arg) {
	var t = 0;
	try {
		t = arg.toString().split(".")[1].length
	} catch (e) {}
	return t;
}
/**
 * 加法函数，用来得到精确的加法结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
export function accAdd(arg1, arg2) {
	var r1 = deal(arg1);
	var r2 = deal(arg2);
	var m = Math.pow(10, Math.max(r1, r2))
	let sum = ((arg1 * m + arg2 * m) / m).toFixed(2);
	return sum
}
/**
 * 乘法函数，用来得到精确的乘法结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
export function accMul(arg1, arg2) {
	var m = 0;
	m += deal(arg1);
	m += deal(arg2);
	var r1 = Number(arg1.toString().replace(".", ""));
	var r2 = Number(arg2.toString().replace(".", ""));

	let sum = ((r1 * r2) / Math.pow(10, m)).toFixed(2);
	return sum
}

/**
 * 除法函数，用来得到精确的除法结果
 * @param {Object} arg1
 * @param {Object} arg2
 */
export function accDiv(arg1, arg2) {
	var t1 = deal(arg1);
	var t2 = deal(arg2);
	var r1 = Number(arg1.toString().replace(".", ""))
	var r2 = Number(arg2.toString().replace(".", ""))

	let sum = ((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(2);
	return sum;
}