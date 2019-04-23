const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const util = require('./utils');

module.exports = async (ctx) => {
    const response = await axios({
        method: 'get',
        url: 'http://fulibus.net',
        headers: {
            Referer: 'http://fulibus.net',
        },
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.excerpt.excerpt-1 h2').get();

    const result = await util.ProcessFeed(list, ctx.cache);

    ctx.state.data = {
        title: 'fuliba首页',
        link: 'http://fulibus.net',
        description: $('meta[name="description"]').attr('content'),
        item: result,
    };
};
