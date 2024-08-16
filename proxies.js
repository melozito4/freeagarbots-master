const agent = require('https-proxy-agent');
const socks = require('socks');
const config = require('./config.js');
const axios = require('axios');
const { readFileSync } = require('fs');

module.exports = class {
    constructor() {
        switch(config.autoProxy) {
            case true:
                axios.get(`https://api.proxyscrape.com/v2/?request=displayproxies&protocol=${config.proxyMode.toLowerCase()}&timeout=${config.proxyTimeout}&country=all&ssl=all&anonymity=all`).then(async result => {
                    this.proxyList  = await result.data.split("\n").map(proxy => proxy.replace('\r', ''));
                    this.proxies = [];
                    this.parseProxies();
                });
                break;
            case false:
                this.proxyList  = readFileSync('./proxies.txt', 'utf-8').split("\n").map(proxy => proxy.replace('\r', ''));
                this.proxies = [];
                this.parseProxies();
                break;
        }
    }

    parseProxies() {
        console.log(`Autograb proxies: ${config.autoProxy}`);
        console.log(`Proxies loaded: ${this.proxyList.length}`);
        for(let i = 0; i < this.proxyList.length; i++) {
            const proxy = this.proxyList[i];
            this.proxies.push(proxy);
        }
    }

    getProxy() {
        let proxy = this.proxies[Math.floor(Math.random() * this.proxies.length)].split(':');
        if(proxy[0] !== '' && proxy[1] !== '') {
            switch(config.proxyMode) {
                case 'socks5':
                    return new socks.Agent({
                        proxy: {
                            ipaddress: proxy[0],
                            port: parseInt(proxy[1]),
                            type: 5
                        }
                    });
                case 'http':
                    return new agent.HttpsProxyAgent(`http://${proxy[0]}:${proxy[1]}`);
            }
        }
        return false;
    }
}