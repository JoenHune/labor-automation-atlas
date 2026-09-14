var script = $('#'+authorizedReadUnitId);
if (script.attr('queryData')) {
	var cmsUrl = script.attr('url');
	var scriptId = script.attr('id');
	var idRandom = 'authorizedRead_' + scriptId;
//	script.before('<div id="' + idRandom + '"></div>');
	var queryData = JSON.parse(script.attr('queryData').replace(/'/g, "\""));
	var bln = false;
	var value = '';
	var paramJson = {
		pageNo: 99999,
		pageSize: 99999,
		search: JSON.stringify(value)
	}
	if ((typeof paramsMap) != 'undefined') {
		for (var i = 0; i < paramsMap.length; i++) {
			if (paramsMap[i].key == queryData.tagId){
				bln = true;
				value = paramsMap[i].value;
			}
		}
	}
	if (bln) {
		queryData.paramJson = JSON.stringify(paramJson);
	}
    if (getUrlParam('combination')){
    	paramJson['pageNo'] = 1
    	paramJson['pageSize'] = 5
    	var search = {}
    	search['xxgkId'] = getUrlParam('combination')
    	search['xxgkType'] = 'xxgk_combination'
    	search['className'] = ''
    	paramJson['search'] = JSON.stringify(search)
		queryData.paramJson = JSON.stringify(paramJson);
    }
	getHtml(cmsUrl, queryData, script);
}

/* 获取url中的参数 */
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

function getHtml(url, queryData, script1) {
	$.ajax({
		url: url,
		type: 'get',
		data: queryData,
		success: function(result) {
//			$('#' + idRandom).html(result.data.html);
			script1.before(result.data.html);
			// 简繁体使用
			if (isOpenTran()) {
			    zh_tranBody();
			}
		},
		error: function(error) {
			// layer.msg('系统错误');
		}
	})
}

// 获取cookie中数据
function getCookie(a) {
    var b = a + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(b);
        if (offset != -1) {
            offset += b.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(offset, end))
        } else {
            return ""
        }
    }
}
// 判断是否开启简繁体
function isOpenTran() {
  if (typeof String.prototype.tran === 'function') {
	  var a = $("meta[name=WebId]").attr('content');
	  var choose = getCookie("zh_choose_" + a)
	  if (choose && choose !== 'n') {
		  return true;
	  }
  }
  return false;
}
