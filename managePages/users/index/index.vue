<template>
  <view class="container">
    <view class="count">小程序注册用户共计：{{ users.length }} 个</view>
    <scroll-view scroll-y class="list">
      <block v-for="(item, key) in users" :key="key">
        <view class="user-item">
          <view class="same-row">
            <image
              :src="item.avatarUrl"
              mode="cover"
              class="avatar"
              v-if="item.avatarUrl"
            ></image>
            <view class="info">
              <view class="same-row mb4" v-if="item.reallyName">
                <text class="label-left">真实姓名：</text>
                <text class="value">{{ item.reallyName }}</text>
              </view>
              <view class="same-row mb4" v-if="item.mobile">
                <text class="label-left">注册手机号：</text>
                <text class="value">{{ item.mobile }}</text>
              </view>
            </view>
          </view>
          <view class="openid value" v-if="item.nickname">
            国信昵称：{{ item.nickname }}
          </view>
          <view class="openid value" v-if="item.gender">
            用户性别：{{ genderMap[item.gender] }}
          </view>
          <view class="openid value"> 微信OpenID：{{ item._id }} </view>
          <view class="user-tag">
            {{ tagMap[item.userTag] }}
          </view>

          <view class="operate-row">
            <!-- <view class="same-btn" bindtap="uploadDirectorFil" data-id="{{item._id}}" v-if="{{item.userTag==='director'}}">上传理事会成员合同</view> -->
            <view class="same-btn" bindtap="openTagModal" data-id="{{item._id}}"
              >修改身份标签</view
            >
          </view>
        </view>
      </block>
    </scroll-view>

    <!-- Gender Modal -->
    <modal
      title="修改性别"
      hidden="{{!showGenderModal}}"
      bindcancel="closeGenderModal"
    >
      <picker
        mode="selector"
        range="{{genderOptions}}"
        bindchange="updateGender"
      >
        <view class="picker">
          当前性别: {{ selectedUser ? selectedUser.gender : "" }}
        </view>
      </picker>
      <button bindtap="closeGenderModal">取消</button>
    </modal>

    <!-- Tag Modal -->
    <modal
      title="修改身份标签"
      hidden="{{!showTagModal}}"
      bindcancel="closeTagModal"
    >
      <picker
        mode="selector"
        range="{{displayTagOptions}}"
        bindchange="updateUserField"
        data-field="userTag"
      >
        <view class="picker">
          当前身份标签: {{ selectedUser ? tagMap[selectedUser.userTag] : "" }}
          <!-- 使用映射对象转换 -->
        </view>
      </picker>
      <button bindtap="closeTagModal">取消</button>
    </modal>
  </view>
</template>

<script>
export default {
  data: function () {
    return {
      users: [
        {
          _id: "8c9e276668a416970281c522128c6a3b",
          owner: "1803248890808373250",
          identityBack: "",
          unionid: "",
          gender: "",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7TZlrUm9M-bTQDfyL12f3BY",
          mobile: "17709170821",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1755584151186,
          createBy: "1803248890808373250",
          updateBy: "1803248890808373250",
          userTag: "normal",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户193473",
          email: "",
          receiveMobile: "",
          updatedAt: 1755584151186,
        },
        {
          _id: "ad1af6df68a4163002787dc502c506c3",
          owner: "1803248890808373250",
          identityBack: "",
          unionid: "",
          gender: "male",
          receiveAddress: "辽宁省大连市金州区湾里街道人文街八十号大连财经学院",
          avatarUrl:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/upload/avatarUrl/202508191453-1379.jpeg",
          openid: "ou-4N7XMp6pOxeOEO-0-vfA5yVKE",
          mobile: "15837281379",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1755584048039,
          createBy: "1803248890808373250",
          updateBy: "1803248890808373250",
          userTag: "normal",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "吴依凡",
          nickname: "Branco@video2PPT",
          email: "wyf20041213@163.com",
          receiveMobile: "15837281379",
          updatedAt: 1755586404197,
        },
        {
          _id: "718e036668a414f70282951a335e7583",
          owner: "1803248890808373250",
          identityBack: "",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7emsEqacpdd4zNZWimesfcU",
          mobile: "18904139857",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1755583735605,
          createBy: "1803248890808373250",
          updateBy: "1803248890808373250",
          userTag: "normal",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "Tom",
          email: "",
          receiveMobile: "",
          updatedAt: 1755586297612,
        },
        {
          _id: "fbf3bf4368429b92020c9c4b7a58ec93",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/upload/avatarUrl/202506061541-9514.jpeg",
          openid: "ou-4N7YpERP-RUfmr0jqYiohbMJQ",
          mobile: "18518089514",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1749195666175,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "毛毛 毛邦铭",
          email: "",
          receiveMobile: "",
          updatedAt: 1749195709958,
        },
        {
          _id: "6c2530cc68429b790209ddae504b1602",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7YnyEn1aa8kE5gikMckHcyg",
          mobile: "15118204386",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1749195641648,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户326284",
          email: "",
          receiveMobile: "",
          updatedAt: 1749195641648,
        },
        {
          _id: "0e7893fb68075c4801a288a057cd5fa4",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7TYE8UVTMgeFOUfQHFeNIms",
          mobile: "13262724889",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1745312840579,
          createBy: "1803248890808373250",
          userTag: "admin",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户994404",
          email: "",
          receiveMobile: "",
          updatedAt: 1756279800545,
        },
        {
          _id: "b01319476806fa6501a03e9868433b56",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7eHgl61t-hhrTO1gRNdDpAY",
          mobile: "15574214151",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1745287781868,
          createBy: "1803248890808373250",
          userTag: "admin",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户778040",
          email: "",
          receiveMobile: "",
          updatedAt: 1756279334415,
        },
        {
          _id: "76c63bbb6805e052018b97d90b85bc16",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7Ydrc3FSoQypNuIZwNJSsL4",
          mobile: "18968962266",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1745215570935,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户702638",
          email: "",
          receiveMobile: "",
          updatedAt: 1745215570935,
        },
        {
          _id: "ed153fc76804dfcf0180ca4e68f5ca6b",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "",
          receiveAddress: "",
          avatarUrl:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/upload/avatarUrl/202504271929-5920.jpg",
          openid: "ou-4N7cE-lP9VKvC_gyhXTV4Xcq0",
          mobile: "18764665920",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1745149903279,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户741284",
          email: "",
          receiveMobile: "",
          updatedAt: 1745753362980,
        },
        {
          _id: "3612033d67d3e8b60102de1e4280f7cb",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7Z7mUcBbQIwsekkg1P0eXUc",
          mobile: "13816095783",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1741940918376,
          createBy: "1803248890808373250",
          userTag: "admin",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "JulianQ",
          email: "qiujialiang@gxhc-cha.com",
          receiveMobile: "",
          updatedAt: 1741940972386,
        },
        {
          _id: "5c644fb367d2704000edd14c13681be8",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7dFibcbY2hqShSiMqGnoKSo",
          mobile: "18121437143",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1741844544370,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户412190",
          email: "",
          receiveMobile: "",
          updatedAt: 1741844544370,
        },
        {
          _id: "ff47e01067b9ffac0312f4f90794ef03",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7dyd5Ct4I07BYlGIRyu4vRI",
          mobile: "15253693530",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1740242860073,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户630242",
          email: "",
          receiveMobile: "",
          updatedAt: 1740242860073,
        },
        {
          _id: "02b3d02c67b596d602dfcb055515535f",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7XR8hQ_rZApnJBFgsmhTJqo",
          mobile: "18616771555",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1739953878907,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户818344",
          email: "",
          receiveMobile: "",
          updatedAt: 1739953878907,
        },
        {
          _id: "21e42ccb67ad8136033b56ae69771da0",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7fV-ZoIJli2GLz8gkTI-LQQ",
          mobile: "15800637655",
          pointUpdateTime: "",
          identityFront: "",
          createdAt: 1739424054257,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户478833",
          email: "",
          receiveMobile: "",
          updatedAt: 1739424054257,
        },
        {
          _id: "0ecc3a0a676a7cc903ae26b01dd903bf",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "广州天河区汇景新城中央庭院C座601",
          avatarUrl: "",
          openid: "ou-4N7R7-Yl9jxppoz87tMENtfjo",
          mobile: "13922431088",
          pointUpdateTime: 1737620596258,
          identityFront: "",
          createdAt: 1735032009712,
          createBy: "1803248890808373250",
          userTag: "admin",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "陈先生",
          nickname: "国信合创用户159775",
          email: "2970532979@qq.com",
          receiveMobile: "13922431088",
          updatedAt: 1735032078606,
        },
        {
          _id: "ce6b953c67652e480382d5096f305dcc",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7ZLK9nhUXwijxMfmdXjqhNw",
          mobile: "18611489458",
          pointUpdateTime: 1737620596168,
          identityFront: "",
          createdAt: 1734684232657,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户633329",
          email: "",
          receiveMobile: "",
          updatedAt: 1734684232657,
        },
        {
          _id: "f5835fa66764bf640379913f39eb50f7",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "北京市海淀区中关村东路95号\n中国科学院自动化研究所",
          avatarUrl:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/upload/avatarUrl/202412200853-0037.jpeg",
          openid: "ou-4N7SJWOlnTs9ZrvgI9lXvBQz0",
          mobile: "18610740037",
          pointUpdateTime: 1737620596091,
          identityFront: "",
          createdAt: 1734655844314,
          createBy: "1803248890808373250",
          userTag: "director",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "易建强",
          nickname: "国信合创用户528422",
          email: "jianqiang.yi@ia.ac.cn",
          receiveMobile: "18610740037",
          updatedAt: 1734656007651,
        },
        {
          _id: "a40fc074676380050364ad811bb6c87a",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7Zm-_r3YQ8ZbeoTG4pKw9Ng",
          mobile: "13764099560",
          pointUpdateTime: 1737620595983,
          identityFront: "",
          createdAt: 1734574085302,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户782708",
          email: "",
          receiveMobile: "",
          updatedAt: 1734574085302,
        },
        {
          _id: "0ecc3a0a6762f1e3035acb4d41b66459",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "female",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7XXTTPE_pQ_EQx27-Uy34Xo",
          mobile: "13621138619",
          pointUpdateTime: 1737620595896,
          identityFront: "",
          createdAt: 1734537699627,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "Michelle 靳",
          email: "780601566@qq.com",
          receiveMobile: "",
          updatedAt: 1734537749280,
        },
        {
          _id: "50de7f5d6762aa4303555f565079cb79",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7TGaH4tP61O7Pu_fz3CuAFI",
          mobile: "18688869982",
          pointUpdateTime: 1737620595802,
          identityFront: "",
          createdAt: 1734519363251,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户107719",
          email: "",
          receiveMobile: "",
          updatedAt: 1734519363251,
        },
        {
          _id: "cc3a41796762a313035894977d20fe20",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7TLB1JF2q2nqQUSG2qjd88Y",
          mobile: "13671718755",
          pointUpdateTime: 1737620595717,
          identityFront: "",
          createdAt: 1734517523467,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 100,
          recipient: "",
          nickname: "卢旭恒",
          email: "",
          receiveMobile: "",
          updatedAt: 1734517554254,
        },
        {
          _id: "a40fc074674a7a07010314ab23d70445",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7Qnn7i83LucjTmj_rffJuQM",
          mobile: "15800801594",
          pointUpdateTime: 1737620595638,
          identityFront: "",
          createdAt: 1732934151731,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户422931",
          email: "",
          receiveMobile: "",
          updatedAt: 1732934151731,
        },
        {
          _id: "2ad666ce672ad96d129ebf7024caaf07",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "female",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7WonLX_N5MFcd5FM34foWjw",
          mobile: "13043499486",
          pointUpdateTime: 1737620595557,
          identityFront: "",
          createdAt: 1730861421591,
          createBy: "1803248890808373250",
          userTag: "director",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 300,
          recipient: "",
          nickname: "赵书君🌞",
          email: "",
          receiveMobile: "",
          updatedAt: 1735542717637,
        },
        {
          _id: "9bf3df13672aae48128ed619298289ee",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl: "",
          openid: "ou-4N7aglqP3mQd09XZR6FXCycsA",
          mobile: "15387911385",
          pointUpdateTime: 1737620595421,
          identityFront: "",
          createdAt: 1730850376514,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "国信合创用户846728",
          email: "",
          receiveMobile: "",
          updatedAt: 1730850376514,
        },
        {
          _id: "9c1e6a31671f03fa114e586d0ab394f8",
          identityBack: "",
          owner: "1803248890808373250",
          unionid: "",
          gender: "male",
          receiveAddress: "",
          avatarUrl:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/upload/avatarUrl/202410281126-0719.jpeg",
          openid: "ou-4N7X54JNzVqiiwZKc_icC8rKc",
          mobile: "13262990719",
          pointUpdateTime: 1737620595341,
          identityFront: "",
          createdAt: 1730085882121,
          createBy: "1803248890808373250",
          userTag: "normal",
          updateBy: "1803248890808373250",
          identityId: "",
          reallyName: "Kira",
          _openid: "1803248890808373250",
          totalPoints: 0,
          recipient: "",
          nickname: "Tia-KUKOKU",
          email: "",
          receiveMobile: "",
          updatedAt: 1730085964465,
        },
        {
          _id: "ef45322e670e0c7f0f884c7667efa136",
          owner: "1803248890808373250",
          unionid: "",
          gender: "female",
          receiveAddress:
            "上海长宁区城区延安西路119号和颐至尊酒店(上海中山公园店)嘎嘎666",
          avatarUrl:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/upload/avatarUrl/202410251127-8110.jpeg",
          openid: "ou-4N7QbR65teQNH8ebhJt8-ZOYg",
          mobile: "13166328110",
          identityFront:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/upload/identityUrl/202410251427-张玉雪正面.png",
          createdAt: 1728973951236,
          createBy: "1803248890808373250",
          userTag: "admin",
          updateBy: "1803248890808373250",
          identityId: "41080419931150062",
          reallyName: "张玉雪",
          _openid: "1803248890808373250",
          recipient: "张ddd无忌",
          nickname: "张玉雪6",
          email: "530067721@qq.com",
          receiveMobile: "13166328110",
          updatedAt: 1734595143052,
          identityBack:
            "cloud://prod-cloud-env-9gqq29j68db5f470.7072-prod-cloud-env-9gqq29j68db5f470-1326719267/miniprogram/upload/identityUrl/202410251429-张玉雪反面.png",
          pointUpdateTime: 1737620595244,
          totalPoints: 0,
        },
      ],
      showGenderModal: false,
      showTagModal: false,
      selectedUser: null,
      genderOptions: ["male", "female"],
      tagOptions: [
        "normal",
        "ambassador",
        "partner",
        "director",
        "investor",
        "admin",
      ],
      tagMap: {
        normal: "普通用户",
        ambassador: "校园大使",
        partner: "校园合伙人",
        director: "理事会成员",
        investor: "投资部",
        admin: "超级管理员",
      },
      genderMap: {
        male: "男",
        female: "女",
      },
      reverseTagMap: {
        普通用户: "normal",
        校园大使: "ambassador",
        校园合伙人: "partner",
        理事会成员: "director",
        投资部: "investor",
        超级管理员: "admin",
      },
      displayTagOptions: [],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 24rpx;
  .count {
    font-weight: bold;
    font-size: 28rpx;
    line-height: 32rpx;
    margin-bottom: 24rpx;
  }
  .same-row {
    display: flex;
    flex-direction: row;
  }
  .list {
    .user-item {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: #ffffff;
      margin-bottom: 24rpx;
      border-radius: 24rpx;
      box-sizing: border-box;
      padding: 24rpx;
      position: relative;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .user-tag {
        width: 150rpx;
        height: 40rpx;
        background: #66beff;
        border-radius: 4rpx;
        color: #ffffff;
        font-size: 24rpx;
        color: #ffffff;
        line-height: 34rpx;
        position: absolute;
        top: 24rpx;
        right: 24rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6rpx;
      }
    }
  }
}
.label-left {
  color: #2f3031;
}
.value {
  color: rgba(47, 48, 49, 0.5);
}
.openid {
  margin-top: 20rpx;
}
.operate-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 24rpx;
}
.same-btn {
  background: #ffffff;
  border-radius: 12rpx;
  border: 1rpx solid #2969ff;
  font-size: 28rpx;
  color: #2969ff;
  line-height: 32rpx;
  margin-left: 14rpx;
  box-sizing: border-box;
  padding: 6rpx 12rpx;
}
.mb4 {
  margin-bottom: 4rpx;
}
.picker {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
</style>
