// $(function(){
     let tianqi;
     $.ajax({
         type:'GET',
         url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
         dataType:'jsonp',
         // data:'name=John&location.com=Boston',
         success:function(obj){
             tianqi=obj.data;
             console.log(tianqi);
             updata(tianqi);
             }
     });
    function updata(){
        // 获取城市
         $('.address').html(tianqi.city);
          // 获取空气质量
        $('.btn span').html(tianqi.weather.quality_level);
        // 今天的度数
        $('.degree').html(tianqi.weather.current_temperature+'°');
        //  天气状况
        $('.state').html(tianqi.weather.current_condition);

        // 今天的情况
        $('.left .temp span:eq(0)').html(tianqi.weather.dat_high_temperature+'°');
        $('.left .temp span:eq(2)').html(tianqi.weather.dat_low_temperature+'°');
        $('.left .lan1').html(tianqi.weather.dat_condition);
        $('.left .temp1').css({'background':"url('img/img/"+tianqi.weather.dat_weather_icon_id+".png') no-repeat 0.2rem 0.01rem/0.48rem 0.49rem"});
        //  明天的情况
        $('.right .temp span:eq(0)').html(tianqi.weather.tomorrow_high_temperature+'°');
        $('.right .temp span:eq(2)').html(tianqi.weather.tomorrow_low_temperature+'°');
        $('.right .lan1').html(tianqi.weather.tomorrow_condition);
        $('.right .temp1').css({'background':"url('img/img/"+tianqi.weather.tomorrow_weather_icon_id+".png') no-repeat 0.2rem 0.01rem/0.48rem 0.49rem"});
        // 24小时近况
        let reall=tianqi.weather.hourly_forecast;
         //console.log(reall);
        $('section ul').html("");
        reall.forEach((v)=>{
          // console.log(v);
             let str=`
             <li>
                <div class="first">${v.hour}:00</div>
                <div class="second"></div>
                <div class="third">${v.temperature}℃</div>
            </li>
           `;
             $('section ul').append(str);
             $('.second').css({'background':"url('img/img/"+v.weather_icon_id+".png ')no-repeat 0rem 0.2rem/0.68rem 0.69rem"});


        });
        //  全天情况
        let  data=tianqi.weather.forecast_list;
       // console.log(data);
        $('.con .tom').html("");
        data.forEach((v,i)=>{
           // console.log(v);
            let str=`
                 <li>
                <div class="box1">昨天</div>
                <div class="box2">01/15</div>
                <div class="box3">${v.condition}</div>
                <div class="box4"></div>
            </li>`;
            $('.tom .box4').css({'background':"url('img/img/"+v.weather_icon_id+".png ')no-repeat   0.4rem 0.2rem/0.78rem 0.79rem"});
            $('.con .tom').append(str);

        });
        let  data1=tianqi.weather.forecast_list;
        //console.log(data1);
        $('.con .wesb').html("");
        data1.forEach((v,i)=>{
           // console.log(v);
            let str=`
                <li>
               <div class="list1"></div>
                <div class="list2">${v.condition}</div>
                <div class="list3">${v.wind_direction}</div>
                <div class="list4">${v.wind_level}级</div>
               </li>
               `;
            $('.wesb .list1').css({'background':"url('img/img/"+v.weather_icon_id+".png ')no-repeat   0.45rem 0.2rem/0.78rem 0.79rem"});
            $('.con .wesb').append(str);
            })
    }
//城市页面
   $('.address').click(function(){
         $('.search').css({'display':'block'});
         $('section').css({'display':'none'});
         $('.con').css({'display':'none'});
         $('footer').css({'display':'none'});
         $('.last').css({'display':'none'});

   });
    // 点击取消，清除当前页面，回到首页
    $('.search span').click(function(){
        $('.search').css({'display':'none'});
        $('section').css({'display':'block'});
        $('.con').css({'display':'block'});
        $('footer').css({'display':'block'});
        $('.last').css({'display':'block'});
    });
    let  city;
    $.ajax({
        type:'GET',
        url:'https://www.toutiao.com/stream/widget/local_weather/city/',
        dataType:'jsonp',
        success:function(obj){
            city=obj.data;
          //  console.log(city);
             update1(city);
        }
    });
    //  出现城市
    function update1(city){
         let k=0;
         for(let i in city){
             let str=`<div class="hot">
                       <h3>${i}</h3>
                       <div class="tall">
                         </div>
                     </div>`;
             $('.search').append(str);
             for(let j in city[i]){
                 let str1=` <div class="city">${j}</div>
                        `;
                  $('.hot .tall').eq(k).append(str1);

             }
             k++;
         }
     }

// });
window.onload=function(){
     $('.hot .tall .city').click(function(){
         $('.search').css({'display':'none'});
         $('section').css({'display':'block'});
         $('.con').css({'display':'block'});
         $('footer').css({'display':'block'});
         $('.last').css({'display':'block'});
         let  con=$(this).html();
        // console.log(con);
         ajaxs(con);

     });
    function  ajaxs(str){
        $.ajax({
            type:'GET',
            url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
            dataType:'jsonp',
            success:function(obj){
                tianqi=obj.data;
               console.log(tianqi);
                updata(tianqi);
            }
        });

    }
    $('input').focus(function(){
        $('.search span').html('搜索');
    });
       $('input').blur(function(){
           $('.search span').html('取消');
       });
    $('.search span').click(function(){
        $('.search').css({'display':'none'});
        $('section').css({'display':'block'});
        $('.con').css({'display':'block'});
        $('footer').css({'display':'block'});
        $('.last').css({'display':'block'});
        let text=$('input').val();

        //  console.log(text);
        for(let i in city) {
            for (let j in city[i]) {
                if (text === j) {
                    ajaxs(text);

                }
            }
        }
        alert("该城市不存在！");


    });



};



