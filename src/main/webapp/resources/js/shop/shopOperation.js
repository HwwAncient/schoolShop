/**
 * 两个功能：
 * 1. 加载shopOperation界面时，请求种类category和区域area信息，加载到界面上
 * 2. 提交用户的请求
 * 3. 验证表单输入
 */
$(function () {
    var shopId = getQueryString("shopId");
    var isEdit = shopId ? true : false;
    var initUrl = "/schoolshop/shopadmin/getshopinitinfo";
    var registerShopUrl = "/schoolshop/shopadmin/registershop";
    var shopInfoUrl = "/schoolshop/shopadmin/getshopbyid?shopId="+shopId;
    var editShopUrl = "/schoolshop/shopadmin/modifyshop";

    if(isEdit){
        getShopInfo(shopId);
    } else {
        getShopInitInfo();
    }

    
    function getShopInitInfo() {
        $.getJSON(initUrl, function (data) {
            if(data.success){
                var tempCategoryHtml = '';
                var tempAreaHtml = '';
                data.shopCategoryList.map(function(item, index){
                    tempCategoryHtml += '<option data-id="' + item.shopCategoryId
                        + '">' + item.shopCategoryName + '</option>'
                });
                data.areaList.map(function (item, index) {
                    tempAreaHtml += '<option data-id="' + item.areaId + '">'
                        + item.areaName + '</option>';
                });
                $("#shop-category").html(tempCategoryHtml);
                $("#area").html(tempAreaHtml);
            }
        })
    }

    function getShopInfo(shopId) {
        $.getJSON(shopInfoUrl, function (data) {
            if(data.success){
                var shop = data.shop;
                $("#shop-name").val(shop.shopName);
                $("#shop-addr").val(shop.shopAddr);
                $("#shop-phone").val(shop.phone);
                $("#shop-desc").val(shop.shopDesc);
                var tempCategoryHtml = '<option data-id="'
                    + shop.shopCategory.shopCategoryId + '" selected>'
                    + shop.shopCategory.shopCategoryName + '</option>';
                var tempAreaHtml = '';
                data.areaList.map(function (item, index) {
                    tempAreaHtml += '<option data-id="' + item.areaId + '">'
                        + item.name + '</option>';
                });
                $("#shop-category").html(tempCategoryHtml);
                $("#shop-category").attr('disabled', 'disabled');
                $("#area").html(tempAreaHtml);
                $("#area option[data-id='" + shop.area.areaId + "']").attr('selected', 'selected');
            }
        })
    }

    $("#submit").click(function () {
        // 获取用户输入的商店信息
        var shop = {};
        if(isEdit)
            shop.shopId = shopId;
        shop.shopName = $("#shop-name").val();
        shop.shopAddr = $("#shop-addr").val();
        shop.phone = $("#shop-phone").val();
        shop.shopDesc = $("#shop-desc").val();
        shop.shopCategory = {
            shopCategoryId:$("#shop-category").find("option").not(function () {
                return !this.selected;
            }).data('id')
        };
        shop.area = {
            areaId:$("#area").find("option").not(function () {
                return !this.selected;
            }).data('id')
        };

        // 获取用户上传的图片信息
        var shopImg = $("#shop-img")[0].files[0];

        // 检查验证码
        var verifyCodeActual = $("#j_captcha").val();
        if(!verifyCodeActual){
            $.toast("请输入验证码！");
            return;
        }

        // 将信息封装
        var formData = new FormData();
        formData.append('shopImg', shopImg);
        formData.append('shopStr', JSON.stringify(shop));
        formData.append('verifyCodeActual', verifyCodeActual);

        // 上传
        $.ajax({
            url:(isEdit ? editShopUrl : registerShopUrl),
            type:"POST",
            data:formData,
            contentType:false,
            processData:false,
            cache:false,
            success:function(data){
                if(data.success){
                    $.toast("提交成功");
                } else {
                    $.toast("提交失败" + data.errMsg);
                }
                $("#captcha_img").click();
            }
        })
    });
});