
var titles = [
    {name: 'Ngàn năm chờ đợi một hồi -  Cúc Tịnh Y', price: 10000},
    {name: 'Vách ngăn trong tim - Nhậm Gia Luân', price: 3000},
    {name: 'Kim hạ - Đàm Tùng Vận', price: 5000},
    {name: 'Túy thiên niên - Trương Kiệt', price: 2000},
    {name: 'Sơ kiến - Bành Tiểu Nhiễm, Trần Tinh Húc', price: 15000},
    {name: 'Nhất tiểu khuynh thành - Trịnh Quốc Phong', price: 36000},
    {name: 'Tỳ bà hành -  An Hữu Nhiên', price: 7000},
    {name: 'Thán vân hề - Cúc Tịnh Y', price: 2500}
    
];
var content = document.getElementById('content');
var render = (list)=>{
    var result = list.map((item)=>{
        return '<li><span class="title">' + item.name + '</span><div><span class="price">' + item.price + 
        '$</span><button class="delete">Delete</button></div></li>';'<li><span class="title">' + item.name + '</span><div><span class="price">' + item.price + 
        '$</span><button class="delete">Delete</button></div></li>';
    });
    var priceTotal = list.reduce((total, item)=>{
        return total + item.price;
    }, 0)
    result.push('<li><h2 class="title">Products Price Total: </h2><h2 class="price">' + priceTotal + 
    '$</h2></li>');
    content.innerHTML = result.join(' ');
};
render(titles);

function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}

var search = document.getElementById('searchButton');
search.onclick = ()=>{
    var input = document.getElementById('search').value;
    var result = titles.filter((item)=>{
        return change_alias(item.name.toLocaleLowerCase()).indexOf(change_alias(input.toLocaleLowerCase())) !== -1? 1: 0;
    })
    render(result);
};
var result = [];
var kq = [];
var temp = [];
var filter = document.getElementById('filter-btn');
filter.addEventListener('change', ()=>{
    var option = filter.value;
    if(temp.length === 0)
        temp = titles;
    if(option.indexOf('-') !== -1){
        var prices = option.split('-');
        var from = parseInt(prices[0]);
        var to = parseInt(prices[1]);
        result = temp.filter((title)=>{
            return title.price >= from & title.price < to ;
        });
    }
    else{
        if(option.indexOf('>') !== -1){
            var price = parseInt(option.split(' ')[1]);
            result = temp.filter((title)=>{
                return title.price > price;
            });
        }
        else{
            result = temp;
        }
    }

    render(result);
});

var sort = document.getElementById('sort-btn');
function sortByAtoZ(input){
    return input.sort((a, b)=>{
        return a.name > b.name? 1: -1;
    });  
}
function sortByZtoA(input){
    return input.sort((a, b)=>{
        return b.name > a.name? 1: -1;
    });  
}
function sortByprice(input){
    return input.sort((a, b)=>{
        return a.price - b.price;
    });  
}
sort.addEventListener('change', ()=>{
    var option = sort.value;
    if(result.length === 0){
        result = titles;
    } 
    if(option === 'A->Z'){
        kq = sortByAtoZ(result);
        temp = sortByAtoZ(titles);
    }
    else{
        if(option === 'Z->A'){
            kq = sortByZtoA(result);
            temp =sortByZtoA(titles);
        }
        else{
            if(option === 'Price'){   
                kq =sortByprice(result);
                temp =sortByprice(titles);
            }
            else{
                kq = titles;
                temp = titles;
            }
        }
    }

    render(kq);
});




