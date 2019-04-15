package edu.whu.iss.mrjiao.schoolShop.dao;

import edu.whu.iss.mrjiao.schoolShop.BaseTest;
import edu.whu.iss.mrjiao.schoolShop.vo.Area;
import edu.whu.iss.mrjiao.schoolShop.vo.PersonInfo;
import edu.whu.iss.mrjiao.schoolShop.vo.Shop;
import edu.whu.iss.mrjiao.schoolShop.vo.ShopCategory;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class ShopDaoTest extends BaseTest {
    @Autowired
    private ShopDao shopDao;

    @Test
    public void testInsertShop(){
        Shop shop = new Shop();
        PersonInfo owner = new PersonInfo();
        Area area = new Area();
        ShopCategory shopCategory = new ShopCategory();

        owner.setUserId(1L);
        area.setAreaId(1);
        shopCategory.setShopCategoryId(1L);

        shop.setOwner(owner);
        shop.setArea(area);
        shop.setShopCategory(shopCategory);
        shop.setShopName("test");
        shop.setShopDesc("test");
        shop.setShopAddr("test");
        shop.setPhone("test");
        shop.setShopImg("test");
        shop.setCreateTime(new Date());
        shop.setEnableStatus(1);
        shop.setAdvice("test");

        int effectedNum = shopDao.insertShop(shop);
        assertEquals(1, effectedNum);
    }

    @Test
    public void testUpdateShop(){
        Shop shop = new Shop();
        shop.setShopId(7L);
        shop.setShopName("update test");
        shop.setShopDesc("update test");
        shop.setLastEditTime(new Date());
        int effectedNum = shopDao.updateShop(shop);
        assertEquals(1, effectedNum);
    }

    @Test
    public void testQueryByShopId(){
        long shopId = 7l;
        Shop shop = shopDao.queryByShopId(shopId);
    }

    @Test
    public void testQueryShopCount(){
        Shop shopCondition = new Shop();
        PersonInfo owner = new PersonInfo();
        owner.setUserId(1l);
        shopCondition.setOwner(owner);
        int count = shopDao.queryShopCount(shopCondition);
    }

    @Test
    public void testQueryShopList(){
        Shop shopCondition = new Shop();
        ShopCategory shopCategory = new ShopCategory();
        shopCategory.setShopCategoryId(2l);
        PersonInfo owner = new PersonInfo();
        owner.setUserId(1l);
        shopCondition.setOwner(owner);
        shopCondition.setShopCategory(shopCategory);
        List<Shop> shopList = shopDao.queryShopList(shopCondition, 0, 2);
    }

}
