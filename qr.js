const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: France_King,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function FLASH_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_France_King = France_King({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_France_King.ev.on('creds.update', saveCreds)
			Qr_Code_By_France_Kingr.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_France_King.sendMessage(Qr_Code_By_France_King.user.id, { text: '' + b64data });
	
				   let FLASH_MD_TEXT = `
*_Qr Code By Tennor tech_*
*_Made With ☣_*
______________________________________
╔════◇
║ *『 Tennor TECH LATEST AI 』*
║ _Deploy your bot now to enjoy the commands._
╰═════════════⊷
╔═════◇
║  『••• OWNER INFO•••』
║❒ *Instagram:* _https://www.instagram.com/giddy_owis_?igsh=YzZ0NDRoaXFxM2Zk==_
║❒ *Owner:* _https://wa.me/254703726139_
║❒ *Repo:* _https://github.com/gidiowis/-Ultraz_
║❒ *WaGroup:* _https://chat.whatsapp.com/CPH3QIk6MMMH7iHIZTO8OE_
║❒ *WaChannel:* _https://whatsapp.com/channel/0029VadqmtNA89MlYOW7Ep2n_
║❒ *YouTube:* _https://youtube.com/@gideonowino-gc2ry?si=_ZSNzzR9Z_JmyzEB
╰═════════════⊷ 
_____________________________________
	
_Don't Forget To Give Star To My Repo_`
	 await Qr_Code_By_France_King.sendMessage(Qr_Code_By_France_King.user.id,{text:FLASH_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_France_King.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					FLASH_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await FLASH_MD_QR_CODE()
});
module.exports = router
