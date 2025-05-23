<script setup lang="ts">
import { NDataTable } from 'naive-ui'

const columns = ref<Array<any>>([
  {
    title: '',
    key: "type"
  },
  {
    title: 'IPv4',
    key: "ipv4"
  },
  {
    title: 'IPv6',
    key: "ipv6"
  },
  {
    title: 'ISP',
    key: 'isp'
  },
  {
    title: 'Mobile LTE',
    key: "mobile"
  },
  {
    title: 'Residential',
    key: "resident"
  }
])
const tableData = [
  {
    type: 'Speed',
    ipv4: 'High',
    ipv6: 'High',
    isp: 'High',
    mobile: 'Average',
    resident: 'High'
  },
  {
    type: 'IP response',
    ipv4: 'Minimal',
    ipv6: 'Minimal',
    isp: 'Minimal',
    mobile: 'Minimal',
    resident: 'Minimal'
  },
  {
    type: 'Anonymity',
    ipv4: 'Anonymous',
    ipv6: 'Anonymous',
    isp: 'Elite',
    mobile: 'Elite',
    resident: 'Elite'
  },
  {
    type: 'Trust score level',
    ipv4: 'Average',
    ipv6: 'Decent',
    isp: 'Excellent',
    mobile: 'Excellent',
    resident: 'Excellent'
  },
  {
    type: 'IP ownership',
    ipv4: 'Minimal',
    ipv6: 'Minimal',
    isp: 'Minimal',
    mobile: 'Minimal',
    resident: 'Minimal'
  },
  {
    type: 'Individual use',
    ipv4: '✔',
    ipv6: '✔',
    isp: '✔',
    mobile: '✔',
    resident: 'х'
  },
  {
    type: 'Security',
    ipv4: '✔',
    ipv6: '✔',
    isp: '✔',
    mobile: '✔',
    resident: '✔'
  },
  {
    type: 'Risk of blocking',
    ipv4: 'Average',
    ipv6: 'Average',
    isp: 'Low',
    mobile: 'No risk',
    resident: 'No risk'
  },
  {
    type: 'Wide compatibility',
    ipv4: '✔',
    ipv6: 'х',
    isp: '✔',
    mobile: '✔',
    resident: '✔'
  },
  {
    type: 'Dynamic IP',
    ipv4: 'No',
    ipv6: 'No',
    isp: 'No',
    mobile: 'Yes',
    resident: 'Yes'
  },
  {
    type: 'IP rotation by time',
    ipv4: 'No',
    ipv6: 'No',
    isp: 'No',
    mobile: 'Yes',
    resident: 'Yes'
  },
  {
    type: 'Precise targeting',
    ipv4: 'No',
    ipv6: 'No',
    isp: 'No',
    mobile: 'No',
    resident: 'Yes'
  },
  {
    type: 'Captcha probability',
    ipv4: 'Likely',
    ipv6: 'Likely',
    isp: 'Eliminated',
    mobile: 'Eliminated',
    resident: 'Eliminated'
  },
  {
    type: 'Multi-threaded operation',
    ipv4: '✔',
    ipv6: '✔',
    isp: '✔',
    mobile: '✔',
    resident: '✔'
  },
  {
    type: 'Support HTTP/s, SOCKS5',
    ipv4: '✔',
    ipv6: '✔',
    isp: '✔',
    mobile: '✔',
    resident: '✔'
  },
  {
    type: 'IP authorization',
    ipv4: '✔',
    ipv6: '✔',
    isp: '✔',
    mobile: '✔',
    resident: '✔'
  },
  {
    type: 'Automation via API',
    ipv4: '✔',
    ipv6: '✔',
    isp: '✔',
    mobile: '✔',
    resident: '✔'
  }
]
</script>

<template>
  <div class="choose-proxy-page">
    <main class="auto-layout">
      <h1 class="fc-main-title">How to choose a proxy, advantages and disadvantages of types?</h1>
      <p class="fc-text">Many people have heard about proxies and their usefulness in scaling processes, but are not
        familiar with the term. As a result, they may not know how to choose the right proxy or may make a random
        choice.</p>
      <br>
      <p class="fc-text">As a service provider that has been offering proxy services for several years, we have several
        recommendations to help you make the right choice if you want to achieve certain results.</p>
      <br>
      <br>
      <p class="fc-main-title">There are several types of proxies:</p>

      <p class="fc-text"><i class="dot"></i><b>Including IPv4</b>, which is the first widely used version that is
        supported by any site, service,
        and program. It has a worldwide quantity limit, good price, stability, and a high level of anonymity. However,
        illegitimate actions may result in getting a block on an entire subnet or network that owns an IP.</p>
      <br>
      <p class="fc-text"><i class="dot"></i><b>IPv6</b> - is a new type of proxy that will eventually replace IPv4. It
        is not supported by every
        site or program, so you need to check before buying. It has a low cost and anonymity, but services are skeptical
        about this type of proxy and may automatically block access from this type of IP for some period.
        ISP - similar to residential proxies, are authentic IP addresses supplied by ISPs and recorded in the databases
        of regional Internet registries. These differ from server proxies, which are associated with data centers, in
        that residential proxies are private addresses issued directly by the internet provider.</p>
      <br>
      <p class="fc-text"><i class="dot"></i><b>ISP</b> - similar to residential proxies, are authentic IP addresses
        supplied by ISPs and recorded
        in the databases of regional Internet registries. These differ from server proxies, which are associated with
        data centers, in that residential proxies are private addresses issued directly by the internet provider.</p>
      <br>
      <p class="fc-text"><i class="dot"></i><b>Mobile proxies</b> - re a type of residential proxy that is similar to
        IPv4, except that any site,
        service, or program identifies it as a real live user because the IP is assigned to real mobile carriers. As a
        result, they cannot resort to any type of blocking. The same IPs are used by real users in a certain country
        from same mobile carriers. Compared to the previous types, they have a high cost, stable operation, and high
        anonymity. The peculiarity of this type is that with each reboot of the device, by time, or request via a link,
        the IP changes. By buying only 1 IP, you will have a whole pool of a mobile carrier at your disposal. When
        buying such proxies, you should not restart your phone or computer, as this is done automatically by the system
        once in the specific time or when you send the request to the rotation link (selection of rotation is available
        when purchasing). All types support HTTP(s) and Socks protocols.</p>
      <br>
      <p class="fc-text">All types support HTTP(s) and Socks protocols.</p>
      <br>
      <br>
      <p class="fc-title">Difference between types of proxies</p>
      <br>
      <n-data-table
          remote
          :columns="columns"
          :data="tableData"
          :row-key="(item)=>item.type"
      />
      <br>
      <p class="fc-text">Almost all types of proxies can be used for the same purposes but features such as trust score
        level and IP dynamics are vital in some niches.</p>
      <br>
      <br>
      <p class="fc-small-title">Here are our recommendations for choosing the right proxy:</p>
      <br>

      <p class="fc-text"><b>1. </b> Depending on the scope of the proxy (social media, betting websites,
        crypto-exchanges, or price scraping), use 1 account per IP. This is the easiest thing to detect because it is
        strange to perform automatic actions with several profiles using only one IP.</p>
      <br>
      <p class="fc-text"><b>2. </b> The location of the proxy must match the profile used wherever it is used. This
        guarantees, first of all, a long life of the profile.</p>
      <br>
      <p class="fc-text"><b>3. </b> Any service, site, or program can easily identify a large number of requests from
        one IP for a certain period of time. Use fine-tuning of threads and timeouts to emulate the actions of a “human”
        as much as possible.</p>
      <br>
      <p class="fc-text"><b>4. </b> When using a proxy in the browser, create a profile for each individual browser or
        profile, clear the cache and cookies, and delete auto-completion of the form before setting it up.</p>
      <br>
      <p class="fc-text"><b>5. </b> If you use a proxification program, for example, proxifier - set each proxy to a
        separate rule. 1 IP - 1 rule for 1 application.</p>

      <br>
      <br>
      <p class="fc-small-title">Conclusion</p>
      <br>
      <p class="fc-text">In summary, based on the information above, you should define several criteria for yourself,
        including:</p>
      <br>
      <p class="fc-text"><i class="dot"></i>The geographical location from where you want to work;</p>
      <br>
      <p class="fc-text"><i class="dot"></i>The required number of proxies based on the amount of work performed (number
        of simultaneous threads, process timeout);</p>
      <br>
      <p class="fc-text"><i class="dot"></i>The budget for a proxy server - the cheapest is not the better option.</p>
      <p class="fc-text"></p>
      <p class="fc-text"></p>
      <p class="fc-text"></p>
    </main>
  </div>
</template>

<style scoped lang="scss">
.choose-proxy-page {
  flex: 1;
  width: 100%;
  height: 100%;
  padding-bottom: 40px;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #98989A;
    display: inline-block;
    margin: 0 10px;
  }

  b {
    font-size: 20px;
    font-weight: bold;
    color: #98989A;
  }
}
</style>