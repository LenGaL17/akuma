import axios from 'react-native-axios';
import cheerio from 'react-native-cheerio';

export default async function getHomeInfos() {
    let result = {
        populars: [],
        releases: []
    };
    await axios.get('https://www.frscan.me/')
    .then(res => {
        let $ = cheerio.load(res.data);
        let populars = $('.span3');
        populars.each((i, e) => {
            let element = $(e)
            result.populars.push({
                id: `${i}`,
                name: element.find('.label.label-warning').text(),
                link: element.find('.label.label-warning').attr('href'),
                src: `https:${element.find('img').attr('src')}`
            });
        });

        let releases = $('.manga-item');
        releases.each((i, e) => {
            let element = $(e);
            let regex = /\s+/g;
            let date = element.find('small').text();
            result.releases.push({
                id: `${i}`,
                name: element.find('a').first().text(),
                date: date.replace(regex, ''),
                scan: element.find('a').last().attr('href')
            });
        });

    });
    return result;
}