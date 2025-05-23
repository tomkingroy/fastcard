<script setup lang="ts">
import { TIpType } from "~/types/ipType"

const currentSelectedIpType = ref(TIpType.ipv4)
const ipTypeList = reactive([
  {label: 'IPv4', value: TIpType.ipv4},
  {label: 'IPv6', value: TIpType.ipv6},
  {label: 'ISP', value: TIpType.isp},
  {label: 'Mobile', value: TIpType.mobile},
  {label: 'Resident', value: TIpType.resident}
])
const handleTabChange = (type: TIpType) => {
  currentSelectedIpType.value = type
}
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <div class="illustration"></div>
      <div class="info">
        <h1 class="title">SWIFT & SECURE <br>
          PERSONAL PROXY SOLUTION
        </h1>
        <div class="service">
          <span class="text">For</span>
          <span class="tag">Social media</span>
          <span class="text">,</span>
          <span class="tag">web scraping</span>
          <span class="text">,</span>
          <span class="tag"> betting websites</span>
          <span class="text">and</span>
          <span class="tag">web surfing without restrictions</span>

          <span class="desc">Social media, web scraping,  betting websites, unrestricted web browsing.</span>
        </div>

        <div class="enter-btn">
<!--          <a href="#" class="line-btn">Our Works</a>-->
          <a href="#buy" class="primary-btn">Now Buy</a>
        </div>

        <div class="service-count">Trusted by 250+ Companies and Individual Users</div>
      </div>
    </div>

    <section class="buy-wrap auto-layout" id="buy">
      <header>
        <p class="title">Buy personal proxies</p>
        <p class="subtitle">Social media, web scraping,  betting websites, web surfing without restrictions.</p>
      </header>

      <div class="label-wrap">
        <span class="label">Select proxy type:</span>
        <LocLink to="/chooseProxy" class="buying-guide">How to choose a proxy?</LocLink>
      </div>

      <ul class="type-list">
        <li :class="[{active: currentSelectedIpType === ip.value}]" v-for="ip in ipTypeList" :key="ip.value"
            @click="handleTabChange(ip.value)">{{ ip.label }}
        </li>
      </ul>

      <ul class="sku-info">
        <BuyFormIPv4 v-if="currentSelectedIpType === TIpType.ipv4"/>
        <BuyFormIPv6 v-if="currentSelectedIpType === TIpType.ipv6"/>
        <BuyFormISP v-if="currentSelectedIpType === TIpType.isp"/>
        <BuyFormMobile v-if="currentSelectedIpType === TIpType.mobile"/>
        <BuyFormResident v-if="currentSelectedIpType === TIpType.resident"/>
      </ul>
    </section>

    <ul class="companies-list auto-layout">
      <li class="item"><img src="~/assets/images/home/adobe-icon.svg" alt="adobe"></li>
      <li class="item"><img src="~/assets/images/home/amazon-icon.svg" alt="amazon"></li>
      <li class="item"><img src="~/assets/images/home/zoom-icon.svg" alt="zoom"></li>
      <li class="item"><img src="~/assets/images/home/zapier-icon.svg" alt="zapier"></li>
      <li class="item"><img src="~/assets/images/home/slack-icon.svg" alt="slack"></li>
      <li class="item"><img src="~/assets/images/home/spotify-icon.svg" alt="spotify"></li>
    </ul>

    <div class="why-choose auto-layout">
      <div class="info">
        <h1 class="title">Why Choose ProIP??</h1>
        <!--        <p class="desc">At proips.com you can buy IPv4 and IPv6 proxies with HTTP(s) and Socks5 support with high speed, stable operation, and round-the-clock technical and customers support. By purchasing private proxies from us service, you will receive IP addresses from a reliable proxy provider from around the world.</p>-->
        <p class="desc">Fast IPv4 and IPv6 proxies (up to 1 Gb/s) will provide any user with stable operation of
          browsers and any other programs where they are required.</p>
      </div>
    </div>

    <ul class="advantages-list auto-layout">
      <li class="item">
        <h3 class="title">Convenient proxy formats</h3>
        <p class="desc">HTTPS or SOCKS5 and individual selection for the required purpose of use: web scraping, online
          games, social media and web surfing without restrictions</p>
      </li>
      <li class="item">
        <h3 class="title">Comprehensive Coverage</h3>
        <p class="desc">Our IP services provide extensive global coverage, ensuring seamless access to networks and
          resources across multiple countries and regions. No matter where you are, we’ve got you covered.</p>
      </li>
      <li class="item">
        <h3 class="title">Unparalleled Customer Satisfaction</h3>
        <p class="desc">We prioritize user experience, offering 24/7 support, personalized solutions, and reliable
          services that exceed customer expectations, making satisfaction our top priority.</p>
      </li>
      <li class="item">
        <h3 class="title">Aligned with GDPR and CCPA</h3>
        <p class="desc">Our services strictly adhere to data privacy regulations, including GDPR and CCPA, ensuring your
          data is handled securely and compliantly, with transparency at the core.</p>
      </li>
      <li class="item">
        <h3 class="title">Steadfast Proxy Networks</h3>
        <p class="desc">With highly stable and resilient proxy networks, we guarantee consistent performance, low
          latency, and minimal downtime, even during peak usage periods.</p>
      </li>
      <li class="item">
        <h3 class="title">Diversity across Networks and Subnets</h3>
        <p class="desc">We offer a wide variety of IPs from multiple networks and subnets, providing flexibility,
          anonymity, and scalability for all your use cases.</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .banner {
    width: 100%;
    height: 795px;
    position: relative;
    background-image: url("~/assets/images/home/banner-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .illustration {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background-image: url("~/assets/images/home/banner-illustration.png");
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: bottom;
    }

    .info {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      flex-direction: column;

      .title {
        color: #FFF;
        text-align: center;
        font-size: 68px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-top: 112px;
        margin-bottom: 30px;
      }

      .service {
        display: flex;
        padding: 18px 30px;
        align-items: center;
        gap: 6px;
        border-radius: 8px;
        border: 1px solid $border-color;
        background: rgba(36, 36, 36, 0.20);
        backdrop-filter: blur(6px);
        margin-bottom: 40px;

        .text,
        .desc {
          color: #98989A;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .tag {
          display: flex;
          padding: 8px 10px;
          justify-content: center;
          align-items: center;
          border-radius: 6px;
          background: $border-color;
          color: #FFF;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .desc {
          text-align: center;
          display: none;
        }
      }

      .enter-btn {
        //width: 250px;
        display: flex;
        margin-bottom: auto;
        justify-content: space-between;

        .line-btn,
        .primary-btn {
          width: 108px;
          height: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          border: 1px solid #333;
          background: rgba(36, 36, 36, 0.20);
          backdrop-filter: blur(6px);
          color: #FFF;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }

        .primary-btn {
          background: #9EFF00;
          color: $border-color;
        }
      }

      .service-count {
        margin-bottom: -25px;
        display: flex;
        padding: 14px 24px;
        align-items: flex-start;
        gap: 10px;
        border-radius: 100px;
        border: 1px solid $border-color;
        background: $theme-bg;
        color: #FDFFFA;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }

  .buy-wrap {
    width: calc(100% - 424px);
    max-width: 1496px;
    display: flex;
    padding: 50px;
    flex-direction: column;
    border-left: 1px solid $border-color;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    header {
      padding-bottom: 20px;
      //border-bottom: 1px solid $border-color;

      .title {
        color: #FFFFFF;
        font-size: 40px;
        line-height: 1.1;
        margin-bottom: 8px;
        font-weight: bold;
      }

      .subtitle {
        color: #E6E6E6;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
      }
    }

    .label-wrap {
      display: flex;
      line-height: 30px;
      margin-top: 20px;
      align-items: center;
      margin-bottom: 10px;
      justify-content: space-between;

      .label,
      .buying-guide {
        font-size: 20px;
        color: #ffffff;
        width: auto !important;
        height: auto !important;
      }

      .buying-guide:hover {
        color: #9EFF00;
      }
    }

    .type-list {
      display: flex;
      padding: 20px;
      align-items: center;
      border-radius: 8px;
      gap: 20px;
      margin-bottom: 20px;
      border: 1px solid $border-color;

      li {
        flex: 1;
        height: 40px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        color: #FFF;
        border: 1px solid transparent;
        background: rgba(36, 36, 36, 0.20);
        font-weight: 600;

        &.active,
        &:hover {
          background: #9EFF00;
          border-color: #333;
          color: $border-color;
        }
      }
    }
  }

  .companies-list {
    display: flex;
    padding: 30px 0;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-left: 1px solid $border-color;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    .item {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 100%;
      }
    }
  }

  .why-choose {
    height: 335px;
    position: relative;
    background-image: url("~/assets/images/home/why-choose-bg.png");
    background-size: 100% 335px;
    background-repeat: no-repeat;
    background-position: bottom;
    border-left: 1px solid $border-color;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    .info {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      //background: linear-gradient(0deg, rgba(172, 255, 36, 0.20) 0%, rgba(172, 255, 36, 0.20) 80%);
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
      background-blend-mode: color, normal, overlay;
      display: flex;
      flex-direction: column;
      gap: 14px;
      align-items: center;
      justify-content: center;

      .title {
        color: #FFF;
        text-align: center;
        font-size: 48px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      .desc {
        color: #E6E6E6;
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
    }
  }

  .advantages-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    //height: 600px;
    border-left: 1px solid $border-color;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    .item {
      //height: 100%;
      text-align: left;
      padding: 50px 50px 80px 50px;
      position: relative;

      &:not(:nth-child(2n))::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 1px;
        background-color: $border-color;
      }

      &:not(:nth-last-child(-n + 2))::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1px;
        width: 100%;
        background-color: $border-color;
      }

      .title {
        color: #D8FF99;
        font-size: 26px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 45px */
        margin-bottom: 20px;
      }

      .desc {
        color: #E6E6E6;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
    }
  }

  /* Middle screen style（980px ~ 1440px） */
  @media screen and (max-width: 1440px) {
    .banner {
      height: 690px;
      //border-right: 1px solid $border-color;
      //border-left: 1px solid $border-color;

      .info {
        .title {
          font-size: 48px;
        }
      }
    }

    .buy-wrap {
      width: calc(100% - 260px);
    }

    .companies-list {
      gap: 20px;
    }

    .why-choose {
      height: 280px;
      background-size: auto 280px;

      .info {
        .title {
          font-size: 38px;
          margin: 0 100px;
        }

        .desc {
          font-size: 16px;
          margin: 0 100px;
        }
      }
    }
  }

  /* Hide navigation (768px ~ 980px） */
  @media screen and (max-width: 980px) {
    .banner {
      background-size: auto 100%;

      .info .service {
        width: auto;
        margin-left: 20px;
        margin-right: 20px;

        .text,
        .tag {
          display: none;
        }

        .desc {
          display: block;
        }
      }
    }

    .buy-wrap {
      width: calc(100% - 216px);
      padding: 28px;
    }
  }

  /* Small screen style（Less than 768px） */
  @media screen and (max-width: 768px) {
    .banner {
      height: 565px;
      border-bottom: 1px solid $border-color;

      .illustration {
        background-size: 890px auto;
      }

      .info {
        .title {
          margin-top: 80px;
          font-size: 34px;
        }

        .service {
          padding: 12px;
        }

        .service-count {
          padding: 8px;
          font-size: 12px;
        }
      }
    }

    .buy-wrap {
      padding: 40px 16px;
      width: calc(100% - 64px);

      header {
        .title {
          font-size: 28px;
        }

        .subtitle {
          font-size: 14px;
        }
      }

      .label-wrap {
        margin-top: 0;

        .label,
        .buying-guide {
          font-size: 14px;
        }
      }

      .type-list {
        padding: 10px;
        margin-bottom: 0;
        gap: 10px;

        li {
          height: 28px;
          font-size: 14px;
        }
      }
    }

    .companies-list {
      padding: 0;
      border-right: 0;
      border-bottom: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 0;

      .item {
        border-right: 1px solid $border-color;
        border-bottom: 1px solid $border-color;

        &:nth-child(1),
        &:nth-child(2) {
          padding-top: 30px;
        }
      }
    }

    .why-choose {
      height: 188px;
      background-size: auto 188px;

      .info {
        .title {
          font-size: 28px;
          margin: 0 16px;
        }

        .desc {
          font-size: 14px;
          margin: 0 16px;
        }
      }
    }

    .advantages-list {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: auto;

      .item {
        &:not(:nth-child(3n))::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 1px;
          background-color: $border-color;
        }

        &::before {
          content: none;
        }
      }
    }
  }

  .mr-20 {
    margin-left: 20px;
  }

  .tab-pane-head {
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 18px;
  }

  .card {
    margin-bottom: 40px;

    .content {
      position: relative;

      .cover {
        width: 100%;
        aspect-ratio: 200/150;
        background-size: cover;
      }

      .country-name {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
      }

      .type {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .footer {
      display: flex;
      justify-content: center;
      align-items: center;

      .place-order {
        flex: 1;
      }
    }
  }
}
</style>
