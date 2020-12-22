let input, arr, Arr, newArr, newArr2, newa, newb, confirm, countPlay, point, lv, countTrueAll;
let timeOut = 3000;

//Max lv 7;
lv = 1;
point = 0;
let upPoint = 0;
// Số lượt chơi
countPlay = 3;
// Tạo mảng số ngẫu nhiên
function makeArr(){
	arr = [];
	for (let i = 0; i < lv; i++) {
	    arr.push(Math.round(Math.random() * 20));
	}

	Arr = [];
	// Cái này cần đổi thành vòng lặp
	for(let i = 0; i < arr.length; i++){
		Arr.push(arr[i]);
	}
	Arr.push(Math.round(Math.random() *20));
	let lengthArr = Arr.length;
	newArr = [];
	for(let i = 0; i < lengthArr; i++){
		let r1 = Arr.splice(Math.floor(Math.random() * Arr.length), 1);
		newArr.push(r1[0]);
	}
}
makeArr();

function createBox(){
	for(let i = 0; i < lv; i++){
		$('.box').append('<div value="" class="item"></div>');
	}
	for(let i = 0; i < lv+1; i++){
		$('.box_hidden').append('<div class="item_hidden"></div>');
	}
}
createBox();

// Lấy sô trùng trong mảng
function checkNumberDup(){
	newa = arr.filter((e, i, a) => a.indexOf(e) !== i);
}
checkNumberDup();

function Console(){
	console.log('mang cu ' + arr);
	console.log('mang moi ' + newArr);
	console.log('so trung nhau ' + newa);
}
Console();

function html(){
	$('#txt_lv').text(lv);
	$('#txt_point').text(point);
	$('#txt_turn').text(countPlay);
}
html();

// Kiếm tra số mình nhập có trong mảng không
function checkTrue(input, list){
	if(list.includes(input)){
		return true;
	}
	else{
		return false;
	}
}

// Đổi màu số
function count(input, list){
	let time = 0;
	for(let i = 0; i < list.length; i++){
		if(list[i] == input){
			time++;
		}
	}
	return time;
}

// Đổi màu số
function countTimes(number, list, listInput){
	count(number, list);
	if(count(number, list) > count(number, listInput)){
		return false;
	}
	else{
		return true;
	}
}

function checkBox(box, listTrue){
	let colorA;
	let colorNumber = [];
	let countObj = {};
	let colorPos = [];
	for(let i in newa){
		countObj[newa[i]] = count(newa[i], arr);
	}
	
	newb = listTrue.filter((e, i, a) => a.indexOf(e) !== i);
	for(let i in newa){
		if(!newb.includes(String(newa[i]))){
			colorNumber.push(newa[i]);
		}
	}

	console.log(colorNumber);
	for(let i in box){
		console.log(box[i][1]);
		if(colorNumber.includes(Number(box[i][1])) && box[i][2] == true){
			colorPos.push(box[i][0]);
		}
	}
	return colorPos;
}

function addValue(){
	for(let i = 0; i < $('.item_hidden').length; i++){
		document.getElementsByClassName('item_hidden')[i].innerText = newArr[i];
	}
}
addValue();
let countTimePlay = 0;
countTrueAll = 0;   // dem xem 1 lan co dung het ko
// Khi bấm nút bắt đầu 
$('#checkBox').click(()=>{
	let countEmpty = 0;
	for(let i = 0; i < $('.item').length; i++){
		if(document.getElementsByClassName('item')[i].textContent == ''){
			countEmpty++;
		}
	}
	if(countEmpty > 0){
		alert('Hãy chọn đủ ô trước khi check');
	}
	else{
		let box, listTrue, colorPos, countTrue;
		listTrue = [];
		box = {};
		$('.item').css('color', 'yellow');
		for(let i = 0; i < lv; i++){
			checkTrue(document.getElementsByClassName('item')[i].getAttribute('value'), arr);
			let a = countTimes(document.getElementsByClassName('item')[i].getAttribute('value'), arr, $('.item').attr('value'));

			if(document.getElementsByClassName('item')[i].getAttribute('value') == arr[i]){
				document.getElementsByClassName('item')[i].setAttribute('before', '♥');
				box[i] = [i, document.getElementsByClassName('item')[i].getAttribute('value'), true];
				listTrue.push(document.getElementsByClassName('item')[i].getAttribute('value'));
			}
			else{
				box[i] = [i, document.getElementsByClassName('item')[i].getAttribute('value'), false];
				document.getElementsByClassName('item')[i].setAttribute('before', 'x');
			}
		}

		$('.item').text(' ');
		$('.item').each(i=>{
			$('.item').eq(i).attr("style","--drop: drop 5s linear alternate forwards");
		});

		colorPos = checkBox(box, listTrue);
		for(let i = 0; i < colorPos.length; i++){
			document.getElementsByClassName('item')[colorPos[i]].style.color = '#ecf0f1';
		}
		
		countTrueAll++;
		countTrue = 0;      // Dem so True trong object
		for(let i = 0; i < Object.keys(box).length; i++){
			if(box[i][2] == true){
				countTrue++;
			}
		}
		if(countTrue == Object.keys(box).length){
			lv++;
			upPoint += 500;
			$('#txt_notification').text('Bạn đã được cộng 500 điểm');
			addNofication();
			function time(){
				$('#txt_point').text(point);
				if(point++ < upPoint){
					setTimeout(time, 0);

				}
			}
			time();
			$('#txt_rate_point').text('500');
			setTimeout(function(){
				$('.rate').css('opacity', '1');
				$('.hidden').css('visibility', 'visible');
				if($('.rate').css('opacity') == '0'){
					$('.box').css('filter', 'blur(10px)');
					$('.status').css('filter', 'blur(10px)');
					$('.btn').css('filter', 'blur(10px)');
					$('.time').css('filter', 'blur(10px)');
					$('#checkBox').css('filter', 'blur(10px)');
				}
			}, 2500);
		}

		if(countTrueAll == 1 && countTrue == Object.keys(box).length){
			upPoint += 500;
			$('#txt_notification').text('Bạn đã được cộng 1000 điểm');
			addNofication();
			function time(){
				$('#txt_point').text(point);
				if(++point < upPoint){
					setTimeout(time, 0);
					
				}
			}
			time();
			$('#txt_rate_point').text('1000');
		}

		if(countTrue < Object.keys(box).length){
			countPlay--;
		}

		if(countPlay == 0){
			alert('Game Over');
			location.reload();
		}

		countTimePlay++;
		function infoRate(){
			if(countTimePlay == 1){
				$('#txt_rate_rank').text('S');
			}
			else if(countTimePlay == 2){
				$('#txt_rate_rank').text('A');
			}
			else if(countTimePlay == 3){
				$('#txt_rate_rank').text('B');
			}
			else if(countTimePlay > 3){
				$('#txt_rate_rank').text('C');
			}
			$('#txt_rate_time').text(countTimePlay);
		}
		infoRate();

		html();
	}
});

function clickMe(){
	let count, countLock, users, userLock;
	count = 0;
	countLock = 4;
	userLock = true;
	users = [
		{
			user: 'admin',
			password: '1234',
		}
	];
	let a = [];
	for(let i = 0; i < $('.item').length; i++){
		document.getElementsByClassName('item')[i].onclick = function(){
			document.getElementsByClassName('item')[i].setAttribute('before','');
			$('.box_hidden').css('visibility', 'visible');
			for(let i2 = 0; i2 < $('.item_hidden').length; i2++){
				document.getElementsByClassName('item_hidden')[i2].onclick = function(){
					document.getElementsByClassName('item')[i].textContent = document.getElementsByClassName('item_hidden')[i2].textContent;
					document.getElementsByClassName('item')[i].setAttribute('value', document.getElementsByClassName('item_hidden')[i2].textContent);
					a.push(document.getElementsByClassName('item_hidden')[i2].textContent);
					document.getElementsByClassName('item')[i].setAttribute('after', a[i]);
				}
			}
		}
	}

	$('.item').click(()=>{
		transition();
	});
	
	$('.item_hidden').click(()=>{
		$('.box_hidden').css('visibility', 'hidden');
		transitionItemHidden();
	});

	$('.rule').click(()=>{
		setTimeout(function(){
			$('.hidden').css('visibility', 'visible');
			$('.rule_hidden').css('opacity', '1');
			
		}, 0);
	
	});

	$('.close').click(()=>{
		setTimeout(function(){

			$('.hidden').css('visibility', 'hidden');
			$('.rule_hidden').css('opacity', '0');
		}, 0);
	});

	$('.p_reg').click(()=>{
		$('.btn_reg').css('z-index', '1');
	});

	$('.btn_reg').click(()=>{
		if($('#txt_user').val().length >= 8 && $('#txt_password').val().length >= 8){
			users[0].user = $('#txt_user').val();
			users[0].password = $('#txt_password').val();
			alert('Ban da dang ky thanh cong');
			$('.btn_reg').css('z-index', '-1');
		}
		else{
			alert('tai khoan phai dai hon 8 va ngan hon 14 ky tu');
		}
	});

	$('.btn_login').click(()=>{
		if($('#txt_user').val() == users[0].user && $('#txt_password').val() == users[0].password && userLock == true){
			$('.container').css('visibility', 'visible');
			$('.login').css('visibility', 'hidden');
			$('#checkBox').css('opacity', '1');
			startTimer(60);
			$('#name').text($('#txt_user').val());
		}
		else{
			count++;
		}
		if(count < 5 && $('#txt_user').val() != users[0].user && $('#txt_password').val() != users[0].password){
			countLock--;
			alert('Ban da nhap sai tai khoan hoac mat khau\nBan chi con ' + countLock + ' lan dang nhap');
		} 
		if(countLock == 0){
			alert('Ban da bi khoa tai khoan');
			userLock = false;
		}
	});

	$('.exit').click(()=>{
		$('.container').css('visibility', 'hidden');
		$('.login').css('visibility', 'visible');
		transitionNone();
	});
}
clickMe();

$('#next').click(()=>{
	$('.rate').css('opacity', '0');
	$('.box').append('<div value="" class="item"></div>');
	$('.box_hidden').append('<div class="item_hidden"></div>');
	$('.item').text('');
	$('.item').each(i=>{
		$('.item').eq(i).attr("style","--drop: up 1s linear alternate forwards");
	});
	$('.hidden').css('visibility', 'hidden');
	$('.box').css('filter', '');
	$('.status').css('filter', '');
	$('.btn').css('filter', '');
	$('.time').css('filter', '');
	$('#checkBox').css('filter', '');
	removeNofication();
	makeArr();
	checkNumberDup();
	Console();
	addValue();
	clickMe();
	html();
	countTrueAll = 0;
	countTimePlay = 0;
});

$('#buyTurn').click(()=>{
	confirm = window.confirm('Bạn có muốn đổi 100 để bằng 1 lượt chơi? ');
	if(confirm == true){
		if(point >= 100){
			point -= 100;
			countPlay++;
		}
		else{
			alert('Bạn không đủ điểm để đổi');
		}
	}
	html();
});

// $('#buyTurn').click(function()
// {
// 	setTimeout(() => {
// 		console.log("Bạn đã được cộng thêm 500 điểm thưởng")
// 		point += 500;
// 		console.log('Điểm của bạn hiện tại: '+ point);
// 	}, timeOut);
// })
// Đưa thời gian đếm ngược ra ngoài màn hình 1 phút

function startTimer(duration) {
	var timer = duration, minutes, seconds;
	setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		$('#txt_time').text(minutes +":" + seconds);
		if(seconds == 0 && minutes == 0){
			point += 100;
			html();
		}

		if (--timer < 0) {
			timer = duration;
		}
	}, 1000);
}

function transitionItemHidden(){
	$('.item_hidden').css('transition', 'none');
	$('.item_hidden').mouseover(()=>{
		$('.item_hidden').css('transition', 'none');
	});
}

function transitionNone(){
	$('#checkBox').css('transition', 'none');
	$('#checkBox').css('opacity', '0');
	$('#buyTurn').css('transition', 'none');
	$('.item').css('transition', 'none');
	$('.rule').css('transition', 'none');
	$('.exit').css('transition', 'none');
}

function transition(){
	$('.item_hidden').css('transition', '.2s');
}

function addNofication(){
	$('.notification').addClass('notificationAnimation');
}

function removeNofication(){
	$('.notification').removeClass('notificationAnimation');
}

// thêm âm thanh vào game
var mySound = soundManager.createSound({
	url: ''
});

$('#checkBox').click(() => {
	mySound.play();
})