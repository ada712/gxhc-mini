<template>
  <view class="wripper">
    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">引言</view>
      </view>
      <view class="row"
        >国信合创（CHA）人工智能共创理事会积分的目的在于构建一个公平、透明、高效的激励机制，通过量化参与理事会工作的贡献度，确保每位伙伴的付出都能得到合理的回报。此举不仅有助于激发成员的积极性和创造力，还能够促进孵化组织内部的良性竞争和协作，从而推动整个组织向更高的目标迈进。</view
      >
      <view class="row"
        >积分制度的核心意义是通过积分的累积和回报，使每位成员感受到自身对组织发展的重要贡献，增强对组织的忠诚度和归属感。通过设定清晰的积分获取规则和回报机制，明确了组织对优秀表现的认可和奖励，引导成员向着组织期望的方向发展。通过积分管理，组织可以更加合理地分配股权等关键资源，确保资源流向对组织贡献最大的成员，从而提高整体运营效率。积分管理方案与组织的长远战略目标相结合，通过激励成员积极参与理事会工作，共同推动组织战略的实施和目标的实现。</view
      >
    </view>
    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分制度的目标与原则</view>
      </view>
      <view class="subtitle">1.理事会建立积分制度希望达到以下目标：</view>
      <view class="row mb16"
        >（1）提升工作效率：成员为了获得更多的积分回报，将更加积极地参与到理事会的工作中，提高工作效率和质量。</view
      >
      <view class="row"
        >（2）增强团队协作：积分管理方案鼓励成员之间的合作与交流，通过团队协作来实现共同目标，从而增强整个团队的凝聚力和协作能力。</view
      >
      <view class="row"
        >（3）激发创新潜能：积分管理方案对于特殊贡献和创新行为的奖励，将激发成员的创新潜能，推动组织在孵化项目中不断探索和创新。</view
      >
      <view class="row"
        >（4）实现可持续发展：通过积分管理方案的持续运行和优化，组织能够建立起一个长效的激励机制，为组织的可持续发展提供坚实的人才和智力支持。</view
      >

      <view class="subtitle">2.理事会积分制度的基本原则：</view>
      <view class="row"
        >积分制度的原则是确保整个激励体系的权威性和有效性，其中“公平、公正、公开”是积分制度核心的价值导向。</view
      >
      <view class="row"
        >（1）公平原则：积分制度的基石，要求在积分的分配和管理过程中，确保每位成员在同等条件下获得相同的积分机会。</view
      >
      <view class="row"
        >（2）公正原则：要求积分制度在执行过程中必须保持一致性和不可偏性。无论是积分的获取、记录还是兑换，都应当遵循统一的标准和流程。任何决策和评判都应当基于客观事实和明确的规则，避免任何形式的主观臆断和任意裁量。</view
      >
      <view class="row"
        >（3）公开原则：强调积分制度的所有规则和操作都应该是透明的，对所有成员开放和可查询的。这包括积分的计算方法、分配标准、兑换规则以及任何相关的政策变动。通过公开透明的信息披露，成员可以清楚地了解自己的积分状况和权益，同时也能够对制度的执行进行监督。</view
      >
    </view>
    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分发行原则</view>
      </view>
      <view class="subtitle">1、积分价值标准：</view>
      <view class="row"
        >理事会设定的积分价值基准为1积分等于人民币100元。所有积分的价值均以此标准进行换算和计算。</view
      >

      <view class="subtitle">2、积分更新时间：</view>
      <view class="row"
        >理事会将<text class="bold underline">每年的10月31日定为积分更新日</text
        >。</view
      >

      <view class="subtitle">3、项目发行积分：</view>
      <view class="row"
        >每个成功发起的孵化公司，将给予理事会0.5%的公司股权，该股权将以孵化时对应的公司估值折算对应积分数额，作为初始积分计入总积分池，参考如下公式：<text
          class="italic-text underline"
          >孵化项目对应积分=项目当期估值*0.5%/100。</text
        >每当有新的项目成功发起，其对应的积分将基于上述规则计算并加入到理事会的积分池中，实现积分的累积和叠加。</view
      >

      <view class="subtitle">4、积分的变动：</view>
      <view class="row"
        >若项目在年度更新日前进行了新一轮融资或其他导致估值变动的行为，理事会将以新的估值为基准，重新计算积分价值，并据此调整积分池中的积分总额。</view
      >
      <view class="row"
        >• 如公司进行新一轮的融资估值增长，则根据公式：<text
          class="italic-text underline"
          >孵化项目对应积分=项目当期估值*0.5%/100调整该项目对应的积分</text
        >。</view
      >
      <view class="row">• 如公司估值不变，对应积分不予调整。</view>
      <view class="row"
        >•
        如公司估值降低或者破产、停止经营，则以公司上一轮折算积分总额在总积分池中扣除，如积分池中未分配积分不足扣除时，不足部分全体积分持有者按比例扣除。</view
      >
    </view>

    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分发放基本原则</view>
      </view>

      <view class="subtitle">1、理事会积分发放日/公示日</view>
      <view class="row"
        ><text class="bold underline"
          >理事会积分发放日/公示日为每年11月30日</text
        >，公示时间为1个月，对积分发放有异议的可在此期间向理事会进行申诉。</view
      >
      <view class="subtitle">2、理事会职务积分：</view>
      <view class="row"
        >在理事会内部，根据成员的职务和职责，将实行一套结构化的积分发放机制。该机制旨在确保每位成员的贡献得到公正的认可，并与其职务的重要性和承担的责任相匹配。理事会职务积分在成员任期开始时进行发放，如卸任则停止发放。</view
      >
      <view class="row">（1）理事会职务积分发放标准：</view>
      <view class="table">
        <view class="tr">
          <view class="td th solidr">职务</view>
          <view class="td th">积分发放数量/每人/年</view>
        </view>
        <view class="tr">
          <view class="td solidr">名誉理事长</view>
          <view class="td">500</view>
        </view>
        <view class="tr">
          <view class="td solidr">理事长</view>
          <view class="td">300</view>
        </view>
        <view class="tr">
          <view class="td solidr">常务理事</view>
          <view class="td">250</view>
        </view>
        <view class="tr">
          <view class="td solidr">秘书长</view>
          <view class="td">150</view>
        </view>
        <view class="tr">
          <view class="td solidr">理事会秘书</view>
          <view class="td">100</view>
        </view>
      </view>
      <view class="row"
        >（2）理事会职务积分额外奖励：理事会每年将不低于300积分作为额外奖励，给予突出贡献者。突出贡献者评定将根据理事会章程中规定得出，于积分发放日/公示日进行公示。</view
      >
      <view class="row"
        >（3）理事会职务积分暂停发放与终止：理事会职务承担着在年度评定不合格或暂停职务的情况下暂停发放下年积分，并进入观察期，如第二年能够合格完成相应的工作，则补发暂停发放的相应积分；如无法继续承担相应工作，积分发放终止，解除职务。</view
      >

      <view class="subtitle">3、理事会日常事务参与者积分发放标准：</view>
      <view class="row"
        >为了更好地激励理事会事务的参与者，提升事务处理的效率和质量，理事会将实施一套积分奖励制度。该制度旨在通过量化参与者的贡献和表现，给予相应的积分奖励，从而激发成员的积极性和创造性，推动理事会各项事务的顺利进行。</view
      >
      <view class="row">（1）事务积分奖励的具体规则：</view>
      <view class="table">
        <view class="tr">
          <view class="td th solidr">事务类型</view>
          <view class="td th">积分发放数量/每人</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加项目竞赛担任评委</view>
          <view class="td">30</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加理事会论坛担任嘉宾</view>
          <view class="td">10</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加理事会制度研讨会</view>
          <view class="td">10</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加理事会事务工作评审</view>
          <view class="td">10</view>
        </view>
        <view class="tr">
          <view class="td solidr">参加理事会品牌宣传活动</view>
          <view class="td">20</view>
        </view>
      </view>
      <view class="row"
        >（2）积分奖励事务内容更新：每年将根据前一年理事会发展情况制定下一年的具体事务发放规则，积分发放日/公示日进行公示。</view
      >

      <view class="subtitle">4、理事会项目推荐积分发放标准：</view>
      <view class="row"
        >为了鼓励大家积极参与项目推荐，吸引更多有潜力和创新性的项目加入孵化体系，理事会将实施一项针对推荐项目的积分奖励机制。以下是该机制的具体描述：</view
      >
      <view class="table">
        <view class="tr">
          <view class="td th solidr">项目情况</view>
          <view class="td th">积分发放数量</view>
        </view>
        <view class="tr">
          <view class="td solidr">成功发起</view>
          <view class="td">200</view>
        </view>
        <view class="tr">
          <view class="td solidr">落地理事会合作产业园</view>
          <view class="td">50</view>
        </view>
      </view>
      <view class="row"
        >成功发起项目后，获得理事会投资股比对应的积分情况：</view
      >
      <view class="table">
        <view class="tr">
          <view class="td th solidr">获得理事会投资股比</view>
          <view class="td th">积分</view>
        </view>
        <view class="tr">
          <view class="td solidr">3%-6%</view>
          <view class="td">100</view>
        </view>
        <view class="tr">
          <view class="td solidr">6%-10%</view>
          <view class="td">150</view>
        </view>
        <view class="tr">
          <view class="td solidr">>10%</view>
          <view class="td">250</view>
        </view>
      </view>
      <view class="row"
        >（1）项目推荐积分发放规则：任何人都可以推荐项目在理事会进行孵化，项目发起成功且理事会顺利投资完成将对推荐人进行积分奖励，原则如下：</view
      >
      <view class="row"
        >（2）项目推荐积分的额外奖励：若推荐项目在孵化期间获得下轮融资，推荐人将获得额外积分奖励，奖励金额测算公式如下：<text
          class="underline italic-text"
          >推荐人额外奖励积分=所推荐项目下轮融资估值/上一轮估值*推荐人因推荐该项目已获得积分总额（包括：成功发起积分+获得理事会投资奖励积分+落地产业园积分）</text
        ></view
      >

      <view class="subtitle">5、理事会合作伙伴积分发放标准：</view>
      <view class="row"
        >理事会每年将从当年未发放积分中留存部分积分作为下一年理事会合作伙伴积分奖励池，将按季度根据合作伙伴贡献程度，由常务理事集体决策发放数额和发放对象。</view
      >
    </view>

    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分兑换原则</view>
      </view>
      <view class="subtitle">1、兑换触发条件</view>
      <view class="row"
        >（1）孵化项目退出且产生现金收益：当理事会孵化的项目成功退出（如通过收购、上市或其他方式）或分红，且产生现金收益时，将启动积分兑换程序。</view
      >
      <view class="row"
        >（2）当期积分排行榜公示确认无误：兑换现金的依据是理事会内部的积分排行榜，该排行榜根据成员累积的积分进行排名并核算积分占积分总和的比例，积分小于等于20分的伙伴积分参与比例计算但不参与现金分配。</view
      >
      <view class="row"
        >（3）项目退出后根据退出估值重新调整理事会总积分池以及对相应推荐人积分、合作伙伴积分等发放完毕。</view
      >

      <view class="subtitle">2、兑换日：</view>
      <view class="row"
        >积分兑换触发条件达成当年进行兑换，<text class="bold underline"
          >积分兑换日为当年12月31日。</text
        ></view
      >
      <view class="subtitle">3、兑换比例：</view>
      <view class="row"
        >当年因项目退出产生的收益70%向全体积分持有者进行兑换，30%留存理事会作为下一年的理事会运营资金储备以及运营公司奖励。</view
      >
      <view class="subtitle">4、兑换流程</view>
      <view class="row"
        >（1）现金收益确认：项目退出后，理事会将对产生的现金收益进行确认，并计算可用于兑换的总金额。</view
      >
      <view class="row"
        >（2）积分核算：秘书处将核算积分排行榜上每位成员的积分，并计算出兑换比例。</view
      >
      <view class="row"
        >（3）现金奖励发放：根据计算结果，理事会将按照成员的积分比例发放现金奖励。发放方式是直接转账到成员指定的银行账户。</view
      >
      <view class="row">（4）兑换比例</view>
      <view class="row">
        个人积分比例：兑换时，每位成员获得的现金奖励将根据其个人或公司持有积分占当前积分排行榜总积分的比例来确定。计算公式：<text
          class="italic-text underline"
          >积分兑换现金数额 = (个人或公司积分 / 积分排行榜总积分) ×
          年度所有项目退出产生的现金收益*70%。说明：积分排行榜总积分为理事会根据积分管理制度给个人或公司发放的积分总和。积分排行榜总积分不等于总积分池，总积分池还包含未发放的积分、理事会留存积分等。</text
        >
      </view>
      <view class="subtitle">5、兑换记录</view>
      <view class="row"
        >（1）记录保存：所有积分兑换的记录将被详细保存，包括兑换时间、兑换金额、兑换成员等信息。</view
      >
      <view class="row"
        >（2）透明度：兑换结果将在理事会内部进行公示，确保兑换过程的公开透明。</view
      >
    </view>

    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">积分的核销、转让与继承</view>
      </view>
      <view class="subtitle">1、理事会积分的核销</view>
      <view class="row"
        >（1）理事会积分每次兑换完成后，对当年产生现金收入的项目在退出前核算的对应积分应在理事会总积分池中未分配积分进行扣除，如未分配积分不足以扣除，则从积分排行榜总积分中按比例向各位积分持有者进行扣除。</view
      >
      <view class="row"
        >（2）如公司估值降低或者破产、停止经营，则以公司上一轮折算积分总额在总积分池中扣除，如积分池中未分配积分不足扣除时，不足部分全体积分持有者按比例扣除。</view
      >
      <view class="subtitle">2、理事会积分的转让</view>
      <view class="row"
        >理事会积分原则上不允许转让，如必要转让需向理事会申请、常务理事会决策，并与律师团队共同拟定转让计划</view
      >
      <view class="subtitle">3、理事会积分的继承</view>
      <view class="row"
        >理事会积分继承机制是为了确保成员权益的延续性，遵守《民法典》的关于继承的相关约定。</view
      >
    </view>

    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">七、积分的管理</view>
      </view>
      <view class="subtitle">1、积分记录与审核：</view>
      <view class="row"
        >为了确保积分管理的准确性和可靠性，理事会将建立一个全面的积分记录系统。该系统将详细记录每位参与者的积分获取、使用和变动情况，包括积分的来源、数额、时间等关键信息。此外，理事会将定期对积分记录进行审核，以检查和纠正可能存在的错误或不一致，确保积分的准确无误。</view
      >
      <view class="subtitle">2、积分查询与公示：</view>
      <view class="row"
        >参与者有权随时查询自己的积分情况。为此，理事会将提供一个便捷的查询平台，使参与者能够轻松访问和查看自己的积分记录。同时，为了增强积分制度的透明度，理事会将定期公示所有参与者的积分排名。这一公示将基于积分记录系统的准确数据，按照年度进行。公示内容将包括积分排名、积分变动情况等，旨在鼓励参与者之间的健康竞争，并提供反馈以促进他们更加积极地参与理事会活动。</view
      >
    </view>

    <view class="same-box">
      <view class="title-row">
        <image :src="imgPath+'/icons/icon-jf.png'" class="icon-jf" />
        <view class="bigtitle">附则</view>
      </view>
      <view class="subtitle">1、理事会积分方案解释权</view>
      <view class="row"
        >方案解释权归理事会所有，意味着理事会对于积分管理方案的所有条款和细则拥有最终的解释和裁定权。在实施过程中，如果出现对方案理解不一致或争议的情况，理事会将负责提供权威性的解释，确保方案的正确理解和执行。理事会的解释将基于方案的初衷和目标，以及法律法规的要求，旨在维护方案的公平性、合理性和有效性。同时，理事会也将确保其解释过程的透明和公正，接受成员的监督和反馈，以促进方案的持续优化和完善。</view
      >
      <view class="subtitle">2、理事会积分方案修订：</view>
      <view class="row"
        >理事会积分方案修订规则旨在确保积分制度能够适应不断变化的组织需求和外部环境，同时保持其激励性和公平性。根据规则，理事会有权对现行的积分方案进行定期评估和必要的修订。修订过程需经过充分的讨论和评估，确保任何变更都符合法律法规，并能够促进理事会的长期目标和成员的共同利益。通过透明和民主的修订流程，理事会确保积分方案的持续优化，满足成员的期望，并维护整个组织的健康发展。</view
      >
      <!-- <view class="row">最新修订时间：2024年7月22日</view> -->

      <view class="subtitle">3、生效与实施：</view>
      <view class="row">理事会制度一经颁布，即刻生效并开始实施。</view>
      <!-- <view class="row">最新时间：2024年7月22日</view> -->
    </view>
  </view>
</template>

<script>
import { imgUrls } from "@/config/app";
export default {
  data: function () {
    return {
      imgPath: imgUrls,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wripper {
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx;
  .same-box {
    width: 100%;
    background-color: #ffffff;
    border-radius: 24rpx;
    box-sizing: border-box;
    padding: 24rpx 24rpx 2rpx 24rpx;
    margin-bottom: 24rpx;
  }
  .title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24rpx;
    .icon-jf {
      width: 28rpx;
      height: 28rpx;
      margin-right: 12rpx;
    }
  }
  .bigtitle {
    font-size: 32rpx;
    font-weight: bold;
    color: #2f3031;
    line-height: 48rpx;
  }
  .subtitle {
    font-size: 28rpx;
    font-weight: bold;
    color: #2f3031;
    line-height: 42rpx;
    margin-bottom: 24rpx;
  }
  .row {
    font-size: 26rpx;
    color: rgba(47, 48, 49, 0.75);
    line-height: 40rpx;
    margin-bottom: 24rpx;
  }
  .mb16 {
    margin-bottom: 16rpx;
  }
  .mb24 {
    margin-bottom: 24rpx;
  }
  .mt20 {
    margin-top: 20rpx;
  }
  .bold {
    color: #2f3031;
    font-weight: bold;
  }
  .underline {
    text-decoration: underline;
  }
  .circle {
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    background-color: #2f3031;
    margin-right: 6rpx;
    display: inline-flex;
  }
  .italic-text {
    font-style: italic;
  }
  .table {
    width: 100%;
    border: 1rpx solid #f4f4f4;
    margin-top: 24rpx;
    margin-bottom: 24rpx;
    .tr {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 80rpx;
    }
    .tr:nth-child(2n-1) {
      background-color: #f4f4f4;
    }
    .td {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26rpx;
      color: rgba(47, 48, 49, 0.75);
      line-height: 40rpx;
      width: 50%;
      height: 80%;
    }
    .th {
      color: #2f3031;
      font-weight: bold;
    }
    .solidr {
      border-right: 1rpx solid #f4f4f4;
    }
    .w50 {
      width: 50%;
    }
  }
}
</style>
