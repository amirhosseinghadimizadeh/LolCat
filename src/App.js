import Torus from "@toruslabs/torus-embed"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@sweetalert2/theme-dark/';
import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from "web3";
import tokenabi from './abi/tokenabi.json';
import lstoreabi from './abi/lstoreabi.json';
import lnftabi from './abi/lnftabi.json';
import Llotteryabi from './abi/lloteryabi.json';
import Web3Modal, { Provider } from "web3modal";
import logo from "./img/1577 [Converted].png"
import lotteryimage from "./img/lottery.jpg"
import github from "./img/github.png"
import twitter from "./img/twitter.png"
import telegram from "./img/telegram.png"
import medium from "./img/medium.png"
import icon_piggy from "./img/icon-piggy-bank.png";
import icon_growth from "./img/icon-growth.png";
import icon_diamond from "./img/icon-diamond.png";
import icon_burn from  "./img/icon-burn.png";
import img_1 from "./img/image.jpg"
import img_2 from "./img/image2.jpg"
import img_3 from "./img/image3.jpg"
import img_4 from "./img/image4.jpg"
import './css/maincss.css';
import './css/resetcss.css';
let provider;
let myaddress;
let web3;
let Tokeninstance;
let Lnftinstance;
let Lstoreinstance;
const MySwal = withReactContent(Swal);
var lastnftinfo;
var lastlotterytime;
var lnftcontract = "0xf2ae43f3754643463a8f273fba3921d2d214eb06";
var tokencontract = "0x6c45f103664d2c0a5ecf272cdc118ce84ef17371";
var Lstorecontract = "0xc0284c78F5b64A85505CDd3358466699c2DfD57c";
var Llotterycontract = "0x70e0fc9d6fdfe7a7d53a4c4b2e415b11c730e850";
function secsToTime(secs) {
let d = secs / 8.64e4 | 0;
let H = (secs % 8.64e4) / 3.6e3 | 0;
let m = (secs % 3.6e3) / 60 | 0;
let s = secs % 60;
let z = n => (n < 10 ? '0' : '') + n;
return `${d}:${z(H)}:${z(m)}:${z(s)}`
}
function LotteryCounter() {
lastlotterytime = lastlotterytime - 1;
if(lastlotterytime<=0){
    document.getElementById('lotterytime').innerHTML = 'LotteryTimeEnded!Wait For Drawing';
}
else{
	document.getElementById('lotterytime').innerHTML = secsToTime(lastlotterytime);
}

}
async function fetchlotteryinfo() {
const w3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
var Llottery = await new w3.eth.Contract(Llotteryabi, Llotterycontract).methods;
var RoundNumber = await Llottery.RoundCount().call();
var Roundinfo = await Llottery.Lottery(RoundNumber).call();
var previous_Round_Info=await Llottery.Lottery(RoundNumber-1).call();
var TotalTickets = Roundinfo['4'];
var TicketPrice = Roundinfo['5'];
var RemainedTime = Roundinfo[2] - (Date.now() / 1000 | 0);
var LotteryWinner = previous_Round_Info['9'];
var UserTotalTicket;
if (provider == null) {
UserTotalTicket = '0';
}
else {
UserTotalTicket = await Llottery.UserTotalTickets(myaddress).call();
}
if (LotteryWinner == '0x0000000000000000000000000000000000000000') {
LotteryWinner = "Lottery Ongoing..."
}
if (RemainedTime <= 0) {
RemainedTime = 0;
}
document.getElementById('lotteryround').innerHTML = RoundNumber;
document.getElementById('totaltickets').innerHTML = TotalTickets;
document.getElementById('ticketprice').innerHTML = w3.utils.fromWei(TicketPrice) + " lcat"+"(10 Percent Fee Included)";
document.getElementById('lotterytime').innerHTML = secsToTime(RemainedTime);
document.getElementById('lotterywinner').innerHTML = LotteryWinner.substr(0, 4) + "..." + LotteryWinner.substr(38, 42);;
document.getElementById('lotterywinner').href = "https://testnet.bscscan.com/token/" + tokencontract + "?a=" + LotteryWinner;
document.getElementById('usertickets').innerHTML = UserTotalTicket + " Tickets";
lastlotterytime = RemainedTime;
document.getElementById('doparticipate').onclick = function () { participateLottery(((document.getElementById('participatevalue').value)/10)*11 , w3.utils.fromWei(TicketPrice)) };
}
async function participateLottery(totalticket, ticketprice) {
try {
if (provider == null) {
console.log("no provider for approve")
doalert("warning", "Connect Wallet!")
}
else {
if (totalticket > 200) {
totalticket = 200;
}
var Llottery = await new web3.eth.Contract(Llotteryabi, Llotterycontract).methods;
Tokeninstance = await new web3.eth.Contract(tokenabi, tokencontract).methods;
var allowance = await Tokeninstance.allowance(myaddress, Llotterycontract).call({ from: myaddress });
var TotalAmount = totalticket * ticketprice;
if (web3.utils.toWei(TotalAmount.toString()) > allowance) {
approveall(Llotterycontract, web3.utils.toWei(TotalAmount.toString()));
}
else {
doalert('info', 'sign tranasction to Buy' + " " + totalticket + " Ticket");
await Llottery.ParticipateLottery(web3.utils.toWei(TotalAmount.toString())).send({ from: myaddress }).then(function (response) {
doalert("success", totalticket + " Tickets Purchased.");
});
}
}
} finally { }
}
function sleep(milliseconds) {
const date = Date.now();
let currentDate = null;
do {
currentDate = Date.now();
} while (currentDate - date < milliseconds);
}
async function fetchAccountData() {
var ShowBalance = document.getElementsByClassName("btnss1");
var ShowAddress = document.getElementsByClassName("btnss2");
if (provider == null) {
ShowBalance[0].innerHTML = 0 + "Lcat";
ShowAddress[0].innerHTML = "Connect"
}
else {
// Get a Web3 instance for the wallet
web3 = new Web3(provider);
Tokeninstance = new web3.eth.Contract(tokenabi, tokencontract).methods;
Lnftinstance = new web3.eth.Contract(lnftabi, lnftcontract).methods;
Lstoreinstance = new web3.eth.Contract(lstoreabi, Lstorecontract).methods;
console.log("Web3 instance is", web3);
// Get connected chain id from Ethereum node
const chainId = await web3.eth.getChainId();
// Load chain information over an HTTP API
// Get list of accounts of the connected wallet
const accounts = await web3.eth.getAccounts();
// MetaMask does not give you all accounts, only the selected account
console.log("Got accounts", accounts);
var selectedAccount = accounts[0];
myaddress = selectedAccount;
ShowAddress[0].innerHTML = selectedAccount.substr(0, 4) + "..." + selectedAccount.substr(38, 42);
// Go through all accounts and get their ETH balance
const rowResolvers = accounts.map(async (address) => {
const balance = await web3.eth.getBalance(address);
const ethBalance = web3.utils.fromWei(balance, "ether");
const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
const balanceoftoken = await Tokeninstance.balanceOf(myaddress).call();
const tokenBalance = await web3.utils.fromWei(balanceoftoken, "ether");
const humanFriendlyBalancetoken = await parseFloat(tokenBalance).toFixed(2);
ShowBalance[0].innerHTML = humanFriendlyBalancetoken + "Lcat";
// Fill in the templated row and put in the document
})
};
}
const providerOptions = {
walletconnect: {
package: WalletConnectProvider, // required
options: {
rpc: {
1: "https://data-seed-prebsc-1-s1.binance.org:8545",
3: "https://data-seed-prebsc-1-s1.binance.org",
100: "https://data-seed-prebsc-1-s1.binance.org",
// ...
}
}
}
, torus: {
package: Torus, // required
options: {
networkParams: {
host: "https://bsc-dataseed.binance.org/", // optional
chainId: 56, // optional
networkId: 1337 // optional
},
config: {
buildEnv: "development" // optional
}
}
}
};
const web3Modal = new Web3Modal({
disableInjectedProvider: false,
cacheProvider: true, // optional
theme: {
background: "rgb(39, 49, 56)",
main: "rgb(199, 199, 199)",
secondary: "rgb(136, 136, 136)",
border: "rgba(195, 195, 195, 0.14)",
hover: "rgb(16, 26, 32)"
},
providerOptions // required
});
//var provider;
async function DisconnectWallet() {
if (provider.close) {
await provider.close();
// If the cached provider is not cleared,
// WalletConnect will default to the existing session
// and does not allow to re-scan the QR code with a new wallet.
// Depending on your use case you may want or want not his behavir.
await web3Modal.clearCachedProvider();
provider = null;
fetchAccountData();
}
}
async function ConnectWallet() {
try {
if (provider == null) {
provider = await web3Modal.connect();

doalert('success', "Wallet Connected Successfully")
fetchAccountData();
fetchlotteryinfo();
provider.on("accountsChanged", (accounts) => {
fetchAccountData();
fetchlotteryinfo();
});
// Subscribe to chainId change
provider.on("chainChanged", (chainId) => {
fetchAccountData();
});
// Subscribe to networkId change
provider.on("networkChanged", (networkId) => {
fetchAccountData();
fetchlotteryinfo();
});
}
else {
DisconnectWallet();
}
} catch (e) {
console.log("Could not get a wallet connection", e);
return;
}
}
var priceinfo = [];
var idinfo = [];
async function LoadNft() {
// var priceinfo=[];
//var idinfo=[];
const w3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
Lstoreinstance = new w3.eth.Contract(lstoreabi, Lstorecontract).methods;
var totalitems = await Lstoreinstance.TotalItems().call();
var i;
for (i = 0; i < totalitems; i++) {
var Item = await new w3.eth.Contract(lstoreabi, Lstorecontract).methods.Items(totalitems - 1 - i).call();
console.log(Item[1]);
if (Item[3] == false) {
await Getnftinfo(Item[1]);
await LoadNftPlans(Item[1], Item[2]);
//document.getElementsByClassName("nft"+Item[1])[0].onclick=function(){alert(Item[2])};
//document.getElementsByClassName('nft'+Item[1])[0].children[3].children[1].children[0].onclick=function(){alert(Item[2])};
//document.getElementsByClassName('nft'+Item[1])[0].onclick=function(){alert(Item[2])};//
priceinfo.push(Item[2]); idinfo.push(Item[1]);
}
}
await setinfo();
}
async function setinfo() {
const w3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
Lstoreinstance = new w3.eth.Contract(lstoreabi, Lstorecontract).methods;
var totalnft = idinfo.length;
var i = 0;
Lnftinstance = await new w3.eth.Contract(lstoreabi, Lstorecontract).methods;
for (i = 0; i < totalnft; i++) {
let input = i;
var getitemid = await Lnftinstance.NftToItemId(idinfo[i]).call({ from: myaddress });
document.getElementsByClassName("nft" + idinfo[i])[0].addEventListener("click", function () { approve(priceinfo[`${input}`]) });
document.getElementsByClassName("buynft" + idinfo[i])[0].addEventListener("click", function () { Buynft(`${getitemid}`, priceinfo[`${input}`]) });
console.log(`${input}`, priceinfo[`${input}`], "hi iam res");
}
}
function doalert(type, message) {
const Toast = Swal.mixin({
toast: true,
position: 'top-start',
showConfirmButton: false,
timer: 6000,
timerProgressBar: true,
didOpen: (toast) => {
toast.addEventListener('mouseenter', Swal.stopTimer)
toast.addEventListener('mouseleave', Swal.resumeTimer)
}
})
Toast.fire({
icon: type,
title: message
})
}
async function Getnftinfo(tokenid) {
const request = new XMLHttpRequest();
const w3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
var metadata = await new w3.eth.Contract(lnftabi, lnftcontract).methods.tokenURI(tokenid).call();
var result;
request.open('GET', metadata);
request.send();
request.onload = () => {
if (request.status === 200) {
console.log("Success"); // So extract data from json and create table 
//Extracting data 
var name = JSON.parse(request.response).name;
var description = JSON.parse(request.response).description;
var externalurl = JSON.parse(request.response).external_url;;
var image = JSON.parse(request.response).image;
console.log(name);
console.log(description);
console.log(externalurl);
console.log(image);
result = new Object();
result[0] = name;
result[1] = description;
result[2] = externalurl;
result[3] = image;
console.log(result);
lastnftinfo = result;
return result;
}
};
request.onerror = () => {
console.log("error is happend to load nft metadata from ipfs");
};
}
async function approve(amount) {
try {
if (provider == null) {
console.log("no provider for approve")
doalert("warning", "Connect Wallet!")
}
else {
Tokeninstance = new web3.eth.Contract(tokenabi, tokencontract).methods;
var ApproveAmount=(amount*1.1)/1000000000000000000
doalert("info", "Sign Transaction For Approving " + ApproveAmount + " Lcat.")
Tokeninstance.approve(Lstorecontract, web3.utils.toWei(ApproveAmount.toString())).send({ from: myaddress }).then(function (response) {
console.log("approve completed");
doalert("success", ApproveAmount + " Lcat" + " Approved.");
});
}
}
finally { }
}
async function approveall(contract, amount) {
try {
if (provider == null) {
console.log("no provider for approve")
doalert("warning", "Connect Wallet!")
}
else {
Tokeninstance = new web3.eth.Contract(tokenabi, tokencontract).methods;
var ApproveAmount=(amount*1.1)/1000000000000000000
doalert("info", "Sign Transaction For Approving " + ApproveAmount + " Lcat.")
Tokeninstance.approve(contract, web3.utils.toWei(ApproveAmount.toString())).send({ from: myaddress }).then(function (response) {
console.log("approve completed");
doalert("success", ApproveAmount + " Lcat" + " Approved.");
});
}
}
finally { }
}
async function Buynft(itemid, nftprice) {
try {
if (provider == null) {
console.log("no provider for approve")
doalert("warning", "Connect Wallet!")
}
else {
doalert('info', 'sign transaction to purchase nft')
Tokeninstance = await new web3.eth.Contract(tokenabi, tokencontract).methods;
Lnftinstance = await new web3.eth.Contract(lstoreabi, Lstorecontract).methods;
var allowance = await Tokeninstance.allowance(myaddress, Lstorecontract).call({ from: myaddress });
if (allowance < nftprice) {
approve(nftprice);
}
else {
await Lnftinstance.BuyNft(itemid).send({ from: myaddress }).then(function (response) {
doalert("success", "Nft Purchase Completed.");
});
}
}
} catch (error) {
doalert("error", "Nft Purchanse Faild.");
}
}
const w3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
var totaladd = 0;
async function LoadNftPlans(tokenid, tokenprice) {
await Getnftinfo(tokenid);
var clone = await document.getElementById('NftPlans');
var itemclone = clone.cloneNode(true);
if (totaladd == 0) {
await document.getElementById('NftPlans').remove();
}
document.getElementById('NftContainer').appendChild(itemclone);
document.getElementById('NftPlans').children[0].innerHTML = lastnftinfo[0] + "(" + tokenid + ")";
document.getElementById('NftPlans').children[1].src = lastnftinfo[3];
document.getElementById('NftPlans').children[2].innerHTML = lastnftinfo[1];
document.getElementById('totalprice').innerHTML = w3.utils.fromWei(tokenprice) + "Lcat";
//document.getElementById('approvefornft').onclick=function(){console.log(tokenprice)};
var forapprove = document.getElementById('approvefornft');
forapprove.className = "btn buy-btn-1" + " " + "approve-btn" + " " + "btn" + " " + "nft" + tokenid;
var ibuynft = document.getElementById('lnftbuy');
ibuynft.className = "btn buy-btn-2" + " " + "buynft" + tokenid;
console.log(tokenid + "hahaha" + tokenprice);
console.log(totaladd + "inforound");
totaladd++;
}
function comingsoon() {
doalert('info', "coming soon...")
}
function App() {
return (

<div className="App">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" />
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link href="https://fonts.googleapis.com/css2?family=B612&display=swap" rel="stylesheet" />
	<header className="App-header">
		<section className="section">
			<div className="container">
				<div id="header">
					<div className="logo">
						<img src={logo} alt="" />
						<span>Lolcat Platform</span>
					</div>
					<span id="btnss">
						<button className="btn btnss1">balance:0Lcat</button>
						<button className="btn btnss2" id="btn-connect">Connect</button>
					</span>
				</div>
			</div>
      {/* main */}
      
			<section>
				<div className="container">
         {/*  main section */}
         
					<div id="main_section">
						<div className="main_description">
							<div>
								<h1 className="big-title">Lolcat Meme And Nft Gaming Platform 
									<br />
									<br />
								</h1>
								<p className="small-subtitle">Lolcat Is Nft Gaming Platform with liquidity Based Supply token Let User To Buy And  Level Up their Nft Power And Win Agains Another Nfts</p>
							</div>
						</div>
						<div className="big_logo">
							<img src={logo} alt="" />
						</div>
					</div>
         {/* buy token */}
         
					<div className="buy-token">
						<h2>BUY TOKEN</h2>
						<span className="line-token" />
						<div className="buy-token-button">
							<button className="btn" onClick={comingsoon}>Buy At PancakeSwap</button>
							<button className="btn" onClick={comingsoon}>Buy At ApeSwap</button>
							<button className="btn" onClick={comingsoon}>Buy At BakerySwap</button>
						</div>
					</div>
					<div className="line-between" />
         {/* nft plan */}
         
					<div class="nft-plan">
						<h2>BUY LOL NFT AND 
							<span class="next-line"> GROW WITH US</span>
						</h2>
						<div class="nft-info-plan " id="NftContainer"></div>
					</div>
					<div className="line-between" />
         {/* lottery */}
         
					<div className="main-lottery">
						<h2>LOTTERY</h2>
						<div className="all-lottery-item">
							<div className="lottery-item">
								<div className="pool-info">
									<span style={{ fontWeight: 900, marginBottom: '0.4rem' }}>participate:</span>
								</div>
								<div className="pool-info">
									<span>lottery round:</span>
									<span id="lotteryround">xxxxxxxxxxxx</span>
								</div>
								<div className="pool-info">
									<span >total tickets:</span>
									<span id="totaltickets">xxxx</span>
								</div>
								<div className="pool-info">
									<span>ticket price:</span>
									<span id="ticketprice">xxxx</span>
								</div>
								<div className="pool-info">
									<span >my tickets:</span>
									<span id="usertickets">xxxx</span>
								</div>
								<div className="pool-info">
									<span>remained time:</span>
									<span id="lotterytime">xx:xx:xx</span>
								</div>
								<div className="pool-info">
									<span>last lottery winner:</span>
									<a id='lotterywinner'>000,000,000</a>
								</div>
								<div className="unstake-div">
									<span className="earn-ltoken">lcat to participate</span>
									<div className="unstake-button">
										<span>
											<input type="text" placeholder={"Ticket Amount"} id="participatevalue" />
										</span>
										<button className="btn none-border2" id="doparticipate">participate</button>
									</div>
								</div>
							</div>
							<div className="lottery-items">
								<img style={{ width: '100%', height: '100%', borderRadius: '5px' }} src={lotteryimage} alt="" />
							</div>
							<div className="lottery-item lottery-item3">
								<div className="pool-info">
									<span>Meow Meow Lets Try Lcat Token Lottery And Try Your Chance To Win Huge Amount Of Lcat Every Ticket Cost Randomly Every Round Between 1 to 10 Lcat And Total Reward Is 60 Percent of Total Ticket And Remained Percent Will Be Used For Token Burning And Tresury Fund </span>
								</div>
							</div>
						</div>
					</div>
					<div className="line-between" />
         {/* fixed apy stake */}
         {/* lol boxes */}
        
					<div className="main-lottery main-features">
						<h1 class="lol-title">Lcat Token Features</h1>
						<div class="all-lol-box">
							<div class="lol-item">
								<img src={icon_piggy} alt="" />
								<h3>Cat Stable</h3>
								<p>In The Third Stage Of Development Users Can Use Lcat And Other Valid Tokens Or Usdt As Collateral To Mint CatStable Tokens
         </p>
							</div>
							<div class="lol-item">
								<img src={icon_growth} alt="" />
								<h3>Consistant Growth</h3>
								<p>We BuyBack And Burn Token Consistantly Also User Can Stake Lcat For More Lcat And Also Stake Lcat For Get Another Tokens As Reward
         </p>
							</div>
							<div class="lol-item">
								<img src={icon_diamond} alt="" />
								<h3>Vip Features</h3>
								<p>User Can Buy Our Vip Features Access With Lnft and Lcat Features Like Dedicated Share From Lcat Launchpad ,Higher Yeild Pools
         </p>
							</div>
							<div class="lol-item">
								<img src={icon_burn} alt="" />
								<h3>Token Burning</h3>
								<p>We Burn 50 Percent Of Team Income From Lottery,Nft Store,Lcat Launchpad and Future Farms
         </p>
							</div>
						</div>
					</div>
					<div className="line-between" />
         {/* teams */}
        
					<div className="main-lottery main-teams">
						<h1 class="lol-title">Team</h1>
						<div class="teams-boxes">
							<div class="teams-item">
								<img class="person-img" src={img_1} alt="" />
								<h3>Nicolas</h3>
								<h4>Toulouse, France</h4>
								<h5>CEO & Co-founder</h5>
								<div class="all-img-social-medias"></div>
							</div>
							<div class="teams-item">
								<img class="person-img" src={img_2} alt="" />
								<h3>Nicolas</h3>
								<h4>Toulouse, France</h4>
								<h5>CEO & Co-founder</h5>
								<div class="all-img-social-medias"></div>
							</div>
							<div class="teams-item">
								<img class="person-img" src={img_3} alt="" />
								<h3>Nicolas</h3>
								<h4>Toulouse, France</h4>
								<h5>CEO & Co-founder</h5>
								<div class="all-img-social-medias"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
		<section style={{ background: '#282B35' }}>
			<div className="container">
				<footer>
					<div className="footer">
						<span>
							<a href="https://twitter.com/LolCat_finance/">
								<img src={twitter} alt="" />
							</a>
							<a href="https://t.me/lol_cat_en/">
								<img src={telegram} alt="" />
							</a>
							<a href="https://github.com/LolCatFInance/">
								<img src={github} alt="" />
							</a>
							<a href="https://medium.com/@Lolcat/">
								<img src={medium} alt="" />
							</a>
						</span>
						<h5>Desiged With Love By LolCat Team And Community</h5>
					</div>
				</footer>
			</div>
		</section>
		<div>
			<div class="nft-item" id="NftPlans">
				<h3>NFT Names</h3>
				<img src="img/nft3.jpg" alt="" />
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at aut commodi doloremque,
   doloribus eaque eius eum eveniet excepturi exercitationem inventore, laborum nobis non
   nostrum perferendis quae quia ut voluptates.</p>
				<div class="approved-nft">
					<div class="amount-of-ltoken">
						<div class="nft-line"></div>
						<h5 id="totalprice">300 ltoken</h5>
					</div>
					<div class="buy-button">
						<button class="btn approve-btn" id="approvefornft">approve</button>
						<button class="btn buy-btn-2" id="lnftbuy">buy</button>
					</div>
				</div>
			</div>
		</div>
	</header>
</div>
);
}
window.addEventListener('load', async () => {
fetchAccountData();
await sleep(3000);
LoadNft();
setInterval(() => {
LotteryCounter()
}, 1000);
await fetchlotteryinfo();
document.querySelector("#btn-connect").addEventListener("click", ConnectWallet);
//document.querySelector("#btn-test").addEventListener("click",LoadNft);
});
export default App;
