// Max 4 lv;
// let lv = 1;
// let appendBox = 5;
let lv = Number(localStorage.lv);														// Biến Tăng độ khó
let appendBox = Number(localStorage.appendBox);											// Biến tạo box
let result = 0;																			// Biến kết quả để so sánh
let number1 = Math.floor((Math.random() * 10) + 2);										// Biến tạo số thứ 1 trong phép toán
let number2 = Math.floor((Math.random() * 10) + 2);										// Biến tạo số thứ 2 trong phép toán
let number3 = Math.floor((Math.random() * 10) + 2);										// Biến tạo số thứ 3 trong phép toán
let number4 = Math.floor((Math.random() * 10) + 2);										// Biến tạo số thứ 4 trong phép toán
let number5 = Math.floor((Math.random() * 10) + 1);										// Biến tạo số thứ 5 trong phép toán
let operation = ['+', '-', '*', '/'];													// Biến lấy giá trị cộng trừ nhân chia
let r1 = operation.splice(Math.floor(Math.random() * operation.length), 1);				// Biến phép tính 1
let r2 = operation.splice(Math.floor(Math.random() * operation.length), 1);				// Biến phép tính 2
let r3 = operation.splice(Math.floor(Math.random() * operation.length), 1);				// Biến phép tính 3
let r4 = operation.splice(Math.floor(Math.random() * operation.length), 1);				// Biến phép tính 4


// Hàm tạo kết quả là số nguyên khi là phép chia
// -----------------------------
function checkOperation(){
	let arrDivisor = [];
	if(r1 == '/'){
		for(let i = 0; i < number1; i++){
			if(number1 % i == 0){
				arrDivisor.push(i);
			}
		}
		number2 = arrDivisor.splice(Math.floor(Math.random() * operation.length), 1);
	}

	if(r2 == '/'){
		for(let i = 0; i < number2; i++){
			if(number2 % i == 0){
				arrDivisor.push(i);
			}
		}
		number3 = arrDivisor.splice(Math.floor(Math.random() * operation.length), 1);
	}

	if(r3 == '/'){
		for(let i = 0; i < number3; i++){
			if(number3 % i == 0){
				arrDivisor.push(i);
			}
		}
		number4 = arrDivisor.splice(Math.floor(Math.random() * operation.length), 1);
	}

	if(r4 == '/'){
		for(let i = 0; i < number4; i++){
			if(number4 % i == 0){
				arrDivisor.push(i);
			}
		}
		number5 = arrDivisor.splice(Math.floor(Math.random() * operation.length), 1);
	}
}
checkOperation();


// Xử lý hiện và ẩn nút bắt đầu và thời gian chạy
// -----------------------------
if(localStorage.lv < 2){
	$('#start').css('visibility', 'visible');
	$('.main').css('visibility', 'hidden');
	$('#out').css('visibility', 'hidden');
}
else{
	startTimer(120);
}


// Nhạc tự bật
// -----------------------------
$(document).ready(function(){
	$(document).click(function(){
		$('#music').trigger('play');
	});
});


// Khi bấm vào nút bắt đầu
// -----------------------------
$('#start').click(function(){
	$('.main').css('visibility', 'visible');
	$('#out').css('visibility', 'visible');
	$(this).css('visibility', 'hidden');
	startTimer(120);
	// $('#music').trigger('play');
	// $('#music').trigger('pause');
});


// Hàm load lại trang khi thua
// -----------------------------
function reload(){
	localStorage.lv = 1;
	localStorage.appendBox = 5;
	location.reload();
}


// Hàm tăng cấp
// -----------------------------
function upLV(){
	location.reload();
	localStorage.lv++;
	localStorage.appendBox++;
	localStorage.appendBox++;
	if(localStorage.lv > 4){
		reload();
	}
}


// Hàm tạo box
// -----------------------------
for(let i = 0; i < appendBox; i++){
	$('.container').append('<div class="item"></div>');
}


// Hàm phân loại box, gán class cho box
// -----------------------------
function showItem(){
	$('.item').each(i => {

		// Nếu số lẻ thì là phép tính
		// -----------------------------
		if(i % 2 != 0){
			$('.item').eq(i).addClass('item__operation');
			$('.item').eq(i).attr('id', 'operation_' + i);
		}

		// Nếu số chẵn thì là các số
		// -----------------------------
		else{
			$('.item').eq(i).addClass('item__number');
			$('.item').eq(i).attr('id', 'number' + i);
		}
	});

	// Tìm ô để gán dấu bằng
	// -----------------------------
	$('.item').eq($('.item').length-2).attr('id', 'equal');

	// Tìm ô để gán kết quả
	// -----------------------------
	$('.item').eq($('.item').length-1).attr('id', 'result');
	$('.item').eq($('.item').length-1).removeClass('item__number');
}
showItem();


// Lấy giá trị của kết quả dựa trên các number random
// -----------------------------
function Operation(){
	if(lv == 1){
		result = eval(number1 + r1 + number2);
	}
	else if(lv == 2){
		result = eval(number1 + r1 + number2 + r2 + number3);
	}
	else if(lv == 3){
		result = eval(number1 + r1 + number2 + r2 + number3 + r3 + number4);
	}
	else if(lv == 4){
		result = eval(number1 + r1 + number2 + r2 + number3 + r3 + number4 + r4 + number5);
	}
}
Operation();


// Gán giá trị để hiển thị lên màn hình
// -----------------------------
function applyValue(){
	$('#number0').text(number1);
	$('#number2').text(number2);
	$('#number4').text(number3);
	$('#number6').text(number4);
	$('#number8').text(number5);
	$('#operation_1').text(r1);
	$('#operation_3').text(r2);
	$('#operation_5').text(r3);
	$('#operation_7').text(r4);
	$('#equal').text('=');
	$('#result').text(result);
}
applyValue();


// Gán giá trị phép nhân X
// -----------------------------
function checkMul(param1, param2, param3, param4){
	if(param1 == '*'){
		$('#operation_1').text('x');
	}
	else if(param2 == '*'){
		$('#operation_3').text('x');
	}
	else if(param3 == '*'){
		$('#operation_5').text('x');
	}
	else if(param4 == '*'){
		$('#operation_7').text('x');
	}
}
checkMul(r1, r2, r3, r4);


// Tạo mảng để lấy vị trí các ô trống [những ô cần đoán]
// -----------------------------
let arrApplyItem = [];
for(let i = 0; i < $('.item__number').length; i++){
	arrApplyItem.push($('.item__number').eq(i).text());
}


// Lấy vị trí của ô trống thứ 1
// -----------------------------
let GetPos1 = Math.floor((Math.random() * arrApplyItem.length));
let GetPos2;

// Gán ô trống thứ 1
// -----------------------------
$('.item__number').eq(GetPos1).text('');
$('.item__number').eq(GetPos1).css('color', 'blue');

// Đổi màu khi di chuột vào ô trống thứ 1
// -----------------------------
$('.item__number').eq(GetPos1).mouseover(function(){
	$(this).css('cursor', 'pointer');
	$(this).css('transform', 'scale(1.1, 1.1)');
	$(this).css('transition', '.5s');
});


// Đổi màu khi di chuột ra ô trống thứ 1
// -----------------------------
$('.item__number').eq(GetPos1).mouseout(function(){
	$(this).css('cursor', 'normal');
	$(this).css('transform', 'scale(1, 1)');
	$(this).css('transition', '.2s');
});


// Sự kiện khi ấn vào ô trống thứ 1
// -----------------------------
$('.item__number').eq(GetPos1).click(function (){
	$('.guess__box__P1').css('visibility', 'visible');
	$('.guess__box__P1').css('opacity', '1');
	$('.false').css('animation', 'none');
	$('#soundClick').trigger('play');

	// Sự kiện khi ấn vào ô chọn đáp án
	// -----------------------------
	$('.P1').click( function(){
		$('.item__number').eq(GetPos1).text($(this).text());
		$('.guess__box__P1').css('opacity', '0');
		$('.guess__box__P1').css('visibility', 'hidden');
		$('#soundClick').trigger('play');
	});
});


// Khi lv 3 trở lên thì mới tìm ô trống thứ 2
// -----------------------------
if(lv > 2){
	do{
		// Lấy vị trí của ô trống thứ 2
		// -----------------------------
		GetPos2 = Math.floor((Math.random() * arrApplyItem.length));
		if (GetPos1 != GetPos2){
			if(2 < lv){

				// Gán ô trống thứ 2
				// -----------------------------
				$('.item__number').eq(GetPos2).text('');
				$('.item__number').eq(GetPos2).css('color', 'blue');

				// Đổi màu khi di chuột vào ô trống thứ 2
				// -----------------------------
				$('.item__number').eq(GetPos2).mouseover(function(){
					$(this).css('cursor', 'pointer');
					$(this).css('transform', 'scale(1.1, 1.1)');
					$(this).css('transition', '.5s');
				});

				// Đổi màu khi di chuột ra ô trống thứ 1
				// -----------------------------
				$('.item__number').eq(GetPos2).mouseout(function(){
					$(this).css('cursor', 'normal');
					$(this).css('transform', 'scale(1, 1)');
					$(this).css('transition', '.2s');
				});
			}
		}

		// Nếu ô trống 2 trùng ô trống 1 thì sẽ tìm lại ô trống 2
		// -----------------------------
	}while(GetPos1 == GetPos2);


	// Sự kiện khi ấn vào ô trống thứ 2
	// -----------------------------
	$('.item__number').eq(GetPos2).click(function(){
		$('.guess__box__P2').css('visibility', 'visible');
		$('.guess__box__P2').css('opacity', '1');
		$('.false').css('animation', 'none');
		$('#soundClick').trigger('play');

		// Sự kiện khi ấn vào ô chọn đáp án
		// -----------------------------
		$('.P2').click( function(){
			$('.item__number').eq(GetPos2).text($(this).text());
			$('.guess__box__P2').css('opacity', '0');
			$('.guess__box__P2').css('visibility', 'hidden');
			$('#soundClick').trigger('play');
		});
	});
}


// Mảng kết quả đúng
// -----------------------------
let GuessNumber = [];
for(let i = 1; i < 6; i++){
	GuessNumber.push(eval('number'+i));
}
console.log(GuessNumber);


// Mảng kết quả đảo lộn để in ra những số cần đoán
// -----------------------------
let GuessNumberRandom = [];
for(let i = 0; i < 5; i++){
	let r6 = GuessNumber.splice(Math.floor(Math.random() * GuessNumber.length), 1)
	GuessNumberRandom.push(r6[0]);
}


// Gán giá trị cho ô những số cần đoán
// -----------------------------
$('.P1').each(i => {
	$('.P1').eq(i).text(GuessNumberRandom[i]);
});


// Gán giá trị cho ô lấy số đoán
// -----------------------------
$('.P2').each(i => {
	$('.P2').eq(i).text(GuessNumberRandom[i]);
});


// Lấy giá trị ô đã có số [ô cho sẵn]
// -----------------------------
let Pos1 = 0;
let Pos2 = 0;
let Pos3 = 0;


// Lấy vị trí ô đã có giá trị 1
// -----------------------------
for(let i = 0; i < $('.item__number').length; i++){

	// lv 3 trở lên có nhiều ô đã có giá trị hơn
	// -----------------------------
	if(lv >= 3){
		if(i != GetPos1 && i != GetPos2){
			Pos1 = i;
			break;
		}
	}

	// lv 2 trở xuống chỉ có 2 ô đã có giá trị
	// -----------------------------
	else{
		if(i != GetPos1){
			Pos1 = i;
			break;
		}
	}
}


// Lấy vị trí ô đã có giá trị P2
// -----------------------------
for(let i = 0; i < $('.item__number').length; i++){

	// lv 3 trở lên có nhiều ô đã có giá trị hơn
	// -----------------------------
	if(lv >= 3){
		if(i != GetPos1 && i != GetPos2 && i != Pos1){
			Pos2 = i;
			break;
		}
	}

	// lv 2 trở xuống chỉ có 2 ô đã có giá trị
	// -----------------------------
	else{
		if(i != Pos1 && i != GetPos1){
			Pos2 = i;
			break;
		}
	}
}


// Lấy vị trí ô đã có giá trị P3
// -----------------------------
for(let i = 0; i < $('.item__number').length; i++){

	// lv 4 sẽ có 3 ô đã có giá trị
	// -----------------------------
	if(lv == 4){
		if(i != GetPos1 && i != GetPos2 && i != Pos1 && i != Pos2){
			Pos3 = i;
			break;
		}
	}
}


// Xử lý so sánh đáp án và thời gian chạy ngược
// -----------------------------
function startTimer(duration) {
	let timer = duration, minutes, seconds;
	setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		$('#txt_clock').text(minutes +":" + seconds);

		if (--timer < 0) {
			timer = duration;
		}

		if(minutes == '00' && seconds < '11'){
			$('#txt_clock').attr('style', '--timeup: timeup 1.5s linear infinite');
			$('#soundDanger').trigger('play');
			$('#music').trigger('pause');
		}

		// Hiện bảng đánh giá khi win và nút qua bàn
		// -----------------------------
		function showRate(){

			// Đánh giá học sinh loại giỏi
			// -----------------------------
			if(seconds > '40' && minutes == '01'){
				setTimeout(function(){
					$('.rate').css('visibility', 'visible');
					$('.rate').css('opacity', '1');
					$('.rate_decor').css('visibility', 'visible');
					$('#txt_rate').text('Bạn đạt học sinh giỏi');
					$('#soundWinOneRound').trigger('play');
					$('#next').css('visibility', 'visible');
					if($('.rate').css('visibility') == 'hidden'){
						$('#check').css('filter', 'blur(10px)');
						$('.container').css('filter', 'blur(10px)');
						$('.clock').css('filter', 'blur(10px)');
					}
					if(lv == 4){
						$('#txt_rate').text('chúc mừng! bạn đã tốt nghiệp cấp 1 với loại giỏi');
						$('#txt_rate').css('font-size', '3.7vw');
						$('#soundWinGame').trigger('play');
						$('#next').text('tốt nghiệp');
						$('#next').css('font-size', '1.8vw');
						$('#next').click(()=>{
							$('.main').css('visibility', 'hidden');
						});
					}
				}, 100);
			}

			// Đánh giá học sinh loại khá
			// -----------------------------
			else if(seconds > '20' && minutes == '01'){
				setTimeout(function(){
					$('.rate').css('visibility', 'visible');
					$('.rate').css('opacity', '1');
					$('.rate_decor').css('visibility', 'visible');
					$('#txt_rate').text('Bạn đạt học sinh khá');
					$('#soundWinOneRound').trigger('play');
					$('#next').css('visibility', 'visible');
					if($('.rate').css('visibility') == 'hidden'){
						$('#check').css('filter', 'blur(10px)');
						$('.container').css('filter', 'blur(10px)');
						$('.clock').css('filter', 'blur(10px)');
					}
					if(lv == 4){
						$('#txt_rate').text('chúc mừng! bạn đã tốt nghiệp cấp 1 với loại khá');
						$('#txt_rate').css('font-size', '3.7vw');
						$('#soundWinGame').trigger('play');
						$('#next').text('tốt nghiệp');
						$('#next').css('font-size', '1.8vw');
						$('#next').click(()=>{
							$('.main').css('visibility', 'hidden');
						});
					}
				}, 100);
			}

			// Đánh giá học sinh loại trung bình
			// -----------------------------
			else if(seconds > '00' && minutes == '01'){
				setTimeout(function(){
					$('.rate').css('visibility', 'visible');
					$('.rate').css('opacity', '1');
					$('.rate_decor').css('visibility', 'visible');
					$('#txt_rate').text('Bạn đạt học sinh trung bình');
					$('#soundWinOneRound').trigger('play');
					$('#next').css('visibility', 'visible');
					if($('.rate').css('visibility') == 'hidden'){
						$('#check').css('filter', 'blur(10px)');
						$('.container').css('filter', 'blur(10px)');
						$('.clock').css('filter', 'blur(10px)');
					}
					if(lv == 4){
						$('#txt_rate').text('chúc mừng! bạn đã tốt nghiệp cấp 1 với loại trung bình');
						$('#txt_rate').css('font-size', '3.7vw');
						$('#soundWinGame').trigger('play');
						$('#next').text('tốt nghiệp');
						$('#next').css('font-size', '1.8vw');
						$('#next').click(()=>{
							$('.main').css('visibility', 'hidden');
						});
					}
				}, 100);
			}

			// Đánh giá học sinh loại dốt
			// -----------------------------
			else if(minutes == '00'){
				setTimeout(function(){
					$('.rate').css('visibility', 'visible');
					$('.rate').css('opacity', '1');
					$('.rate_decor').css('visibility', 'visible');
					$('#txt_rate').text('Xin lỗi, bạn chỉ là học sinh dốt');
					$('#soundWinOneRound').trigger('play');
					$('#next').css('visibility', 'visible');
					if($('.rate').css('visibility') == 'hidden'){
						$('#check').css('filter', 'blur(10px)');
						$('.container').css('filter', 'blur(10px)');
						$('.clock').css('filter', 'blur(10px)');
					}
					if(lv == 4){
						$('#txt_rate').text('chúc mừng! bạn đã tốt nghiệp cấp 1 với loại dốt');
						$('#txt_rate').css('font-size', '3.7vw');
						$('#soundWinGame').trigger('play');
						$('#next').text('tốt nghiệp');
						$('#next').css('font-size', '1.8vw');
						$('#next').click(()=>{
							$('.main').css('visibility', 'hidden');
						});
					}
				}, 100);
			}
		}


		// Thông báo bạn chọn sai kết quả
		// -----------------------------
		function showFalse(){
			$('#txt_rate').text('Bạn đã trả lời sai');
			$('.false').attr('style', '--false: false 1s linear');
			$('#soundFalse').trigger('play');
		}

		// Khi hết thời gian
		// -----------------------------
		if(minutes == '00' && seconds == '00'){
			setTimeout(function(){
					$('.rate').css('visibility', 'visible');
					$('.rate').css('opacity', '1');
					$('.rate_decor').css('visibility', 'visible');
					$('#txt_rate').text('Chúc mừng! bạn đã được một năm free để học lại');
					$('#txt_rate').css('font-size', '3.7vw');
					$('#next').css('visibility', 'visible');
					$('#next').text('lại luôn');
					$('#next').css('font-size', '2vw');
					$('#music').trigger('pause');
					$('#soundTryAgain').trigger('play');
					if($('.rate').css('visibility') == 'hidden'){
						$('#check').css('filter', 'blur(10px)');
						$('.container').css('filter', 'blur(10px)');
						$('.clock').css('filter', 'blur(10px)');
					}
				}, 100);

			$('#next').click(()=>{
				reload();
			});
		}


		// Kiểm tra đáp án
		// -----------------------------
		$('#check').click(()=>{
			$('#soundClick').trigger('play');
			let NumberEmpty1 = Number($('.item__number').eq(GetPos1).text());						// Biến lấy giá trị của ô trống 1
			let NumberEmpty2 = Number($('.item__number').eq(GetPos2).text());						// Biến lấy giá trị của ô trống 2
			let NumberPos1 = Number($('.item__number').eq(Pos1).text());							// Biến lấy giá trị của ô đã có giá trị 1
			let NumberPos2 = Number($('.item__number').eq(Pos2).text());							// Biến lấy giá trị của ô đã có giá trị 2
			let NumberPos3 = Number($('.item__number').eq(Pos3).text());							// Biến lấy giá trị của ô đã có giá trị 3
		

			// LV 1
			// -----------------------------
			if(lv == 1){
				if(GetPos1 >= 1){
					if(eval(NumberPos1 + r1 + NumberEmpty1) == result){
						showRate();
					}
					else{
						showFalse();
					}
				}
				else{
					if(eval(NumberEmpty1 + r1 + NumberPos1) == result){
						showRate();
					}
					else{
						showFalse();
					}
				}
			}


			// LV 2
			// -----------------------------
			if(lv == 2){
				if(GetPos1 == 0){
					if(eval(NumberEmpty1 + r1 + NumberPos1 + r2 + NumberPos2) == result){
						showRate();
					}
					else{
						showFalse();
					}
				}
				else if(GetPos1 == 1){
					if(eval(NumberPos1 + r1 + NumberEmpty1 + r2 + NumberPos2) == result){
						showRate();
					}
					else{
						showFalse();
					}
				}
				else if(GetPos1 == 2){
					if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberEmpty1) == result){
						showRate();
					}
					else{
						showFalse();
					}
				}
			}


			// LV 3
			// -----------------------------
			if(lv == 3){
				// Nếu Vị trị 1 nhỏ hơn 2
				if(GetPos1 < GetPos2){
					if(GetPos1 == 0 && GetPos2 == 1){
						if(eval(NumberEmpty1 + r1 + NumberEmpty2 + r2 + NumberPos1 + r3 + NumberPos2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 0 && GetPos2 == 2){
						if(eval(NumberEmpty1 + r1 + NumberPos1 + r2 + NumberEmpty2 + r3 + NumberPos2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 0 && GetPos2 == 3){
						if(eval(NumberEmpty1 + r1 + NumberPos1 + r2 + NumberPos2 + r3 + NumberEmpty2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}


					else if(GetPos1 == 1 && GetPos2 == 2){
						if(eval(NumberPos1 + r1 + NumberEmpty1 + r2 + NumberEmpty2 + r3 + NumberPos2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 1 && GetPos2 == 3){
						if(eval(NumberPos1 + r1 + NumberEmpty1 + r2 + NumberPos2 + r3 + NumberEmpty2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}


					else if(GetPos1 == 2 && GetPos2 == 3){
						if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberEmpty1 + r3 + NumberEmpty2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
				}

				// Ngược lại
				else{
					if(GetPos2 == 0 && GetPos1 == 1){
						if(eval(NumberEmpty2 + r1 + NumberEmpty1 + r2 + NumberPos1 + r3 + NumberPos2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 0 && GetPos1 == 2){
						if(eval(NumberEmpty2 + r1 + NumberPos1 + r2 + NumberEmpty1 + r3 + NumberPos2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 0 && GetPos1 == 3){
						if(eval(NumberEmpty2 + r1 + NumberPos1 + r2 + NumberPos2 + r3 + NumberEmpty1) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}

					else if(GetPos2 == 1 && GetPos1 == 2){
						if(eval(NumberPos1 + r1 + NumberEmpty2 + r2 + NumberEmpty1 + r3 + NumberPos2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 1 && GetPos1 == 3){
						if(eval(NumberPos1 + r1 + NumberEmpty2 + r2 + NumberPos2 + r3 + NumberEmpty1) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}


					else if(GetPos2 == 2 && GetPos1 == 3){
						if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberEmpty2 + r3 + NumberEmpty1) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
				}
			}


			// LV 4
			// -----------------------------
			if(lv == 4){
				// Nếu Vị trị 1 nhỏ hơn 2
				if(GetPos1 < GetPos2){
					if(GetPos1 == 0 && GetPos2 == 1){
						if(eval(NumberEmpty1 + r1 + NumberEmpty2 + r2 + NumberPos1 + r3 + NumberPos2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 0 && GetPos2 == 2){
						if(eval(NumberEmpty1 + r1 + NumberPos1 + r2 + NumberEmpty2 + r3 + NumberPos2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 0 && GetPos2 == 3){
						if(eval(NumberEmpty1 + r1 + NumberPos1 + r2 + NumberPos2 + r3 + NumberEmpty2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 0 && GetPos2 == 4){
						if(eval(NumberEmpty1 + r1 + NumberPos1 + r2 + NumberPos2 + r3 + NumberPos3 + r4 + NumberEmpty2) == result){
							showRate();
						}
						else{
						showFalse();
						}
					}


					else if(GetPos1 == 1 && GetPos2 == 2){
						if(eval(NumberPos1 + r1 + NumberEmpty1 + r2 + NumberEmpty2 + r3 + NumberPos2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 1 && GetPos2 == 3){
						if(eval(NumberPos1 + r1 + NumberEmpty1 + r2 + NumberPos2 + r3 + NumberEmpty2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 1 && GetPos2 == 4){
						if(eval(NumberPos1 + r1 + NumberEmpty1 + r2 + NumberPos2 + r3 + NumberPos3 + r4 + NumberEmpty2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}


					else if(GetPos1 == 2 && GetPos2 == 3){
						if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberEmpty1 + r3 + NumberEmpty2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos1 == 2 && GetPos2 == 4){
						if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberEmpty1 + r3 + NumberPos3 + r4 + NumberEmpty2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}

					else if(GetPos1 == 2 && GetPos2 == 4){
						if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberPos3 + r3 + NumberEmpty1 + r4 + NumberEmpty2) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
				}

				// Ngược lại
				else{
					if(GetPos2 == 0 && GetPos1 == 1){
						if(eval(NumberEmpty2 + r1 + NumberEmpty1 + r2 + NumberPos1 + r3 + NumberPos2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 0 && GetPos1 == 2){
						if(eval(NumberEmpty2 + r1 + NumberPos1 + r2 + NumberEmpty1 + r3 + NumberPos2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 0 && GetPos1 == 3){
						if(eval(NumberEmpty2 + r1 + NumberPos1 + r2 + NumberPos2 + r3 + NumberEmpty1 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 0 && GetPos1 == 4){
						if(eval(NumberEmpty2 + r1 + NumberPos1 + r2 + NumberPos2 + r3 + NumberPos3 + r4 + NumberEmpty1) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}

					else if(GetPos2 == 1 && GetPos1 == 2){
						if(eval(NumberPos1 + r1 + NumberEmpty2 + r2 + NumberEmpty1 + r3 + NumberPos2 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 1 && GetPos1 == 3){
						if(eval(NumberPos1 + r1 + NumberEmpty2 + r2 + NumberPos2 + r3 + NumberEmpty1 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 1 && GetPos1 == 4){
						if(eval(NumberPos1 + r1 + NumberEmpty2 + r2 + NumberPos2 + r3 + NumberPos3 + r4 + NumberEmpty1) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}


					else if(GetPos2 == 2 && GetPos1 == 3){
						if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberEmpty2 + r3 + NumberEmpty1 + r4 + NumberPos3) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
					else if(GetPos2 == 2 && GetPos1 == 4){
						if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberEmpty2 + r3 + NumberPos3 + r4 + NumberEmpty1) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}

					else if(GetPos2 == 3 && GetPos1 == 4){
						if(eval(NumberPos1 + r1 + NumberPos2 + r2 + NumberPos3 + r3 + NumberEmpty2 + r4 + NumberEmpty1) == result){
							showRate();
						}
						else{
							showFalse();
						}
					}
				}
			}
		});
	}, 1000);
}


// Tăng lv free
// $('#clickme').click(function(){
// 	upLV();
// });

// Xử lý khi bấm nút qua bàn
$('#next').click(()=>{
	upLV();
});

// Xử lý thoát game
$('#out').click(()=>{
	reload();
});
