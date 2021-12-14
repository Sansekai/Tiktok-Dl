const readlineSync = require('readline-sync')
const axios = require('axios')
const cheerio = require('cheerio')
const chalk = require('chalk')
const { exec } = require('child_process')

async function TiktokDownloader (Url) {
	return new Promise (async (resolve, reject) => {
		await axios.request({
			url: "https://ttdownloader.com/",
			method: "GET",
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
				"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
			}
		}).then(respon => {
			const $ = cheerio.load(respon.data)
			const token = $('#token').attr('value')
			axios({
				url: "https://ttdownloader.com/req/",
				method: "POST",
				data: new URLSearchParams(Object.entries({url: Url, format: "", token: token})),
				headers: {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
					"cookie": "_ga=GA1.2.1240046717.1620835673; PHPSESSID=i14curq5t8omcljj1hlle52762; popCookie=1; _gid=GA1.2.1936694796.1623913934"
				}
			}).then(res => {
				const ch = cheerio.load(res.data)
				const result = {
					status: res.status,
					result: {
						nowatermark: ch('#results-list > div:nth-child(2)').find('div.download > a').attr('href'),
						watermark: ch('#results-list > div:nth-child(3)').find('div.download > a').attr('href'),
						audio: ch('#results-list > div:nth-child(4)').find(' div.download > a').attr('href')
					}
				}
				resolve(result)
			}).catch(reject)
		}).catch(reject)
	})
}

console.log(chalk.green('\n--------------------\nTiktok Downloader\nBy Yusril\nhttps://nikkixploit.com\n--------------------\n'))
console.log(chalk.yellow('Menu Downloader:\n1. Tiktok No WM\n2. Tiktok With WM\n'))
const pilih = readlineSync.questionInt("- Mau menu nomor berapa?: ")
if (pilih > 2) return console.log(chalk.red('Pilihan menunya cuma 1 - 2'))
const url = readlineSync.question("- Masukkan Link Tiktoknya: ")

async function start() {
try {
	if (pilih == '1') {
TiktokDownloader(url)
.then(data => {
exec(`termux-open ${data.result.nowatermark}`)
})
} else if (pilih == '2') {
	TiktokDownloader(url)
.then(data => {
exec(`termux-open ${data.result.watermark}`)
})
		} else {
			console.log(chalk.red('Pilihan menunya cuma 1 - 2'))
			}
} catch(err) {
        console.log(err)
    }
    
    }
start()