function findAddresses() {
    let page =  document.getElementsByTagName('html')[0].innerHTML;
    let links = page.match( /(http|https)\:\/\/.*\.mp4/g );
    return links;
}

function goodCode(code){
    switch (code){
        case 200:
            return true;
        case 301:
            return true;
        case 302:
            return true;
        default:
            return false;
    }
}

function checkLinks(links) {
    try{
        if( typeof links != "object"){
            throw `Wrong return type for ${links}`
        }

        let existing = []
        let len = links.length;
        if(len==0)return [];

        console.log(len);

        for(l=0;l<len;l++){
            try{
                var http = new XMLHttpRequest();
                http.open('HEAD', links[l], false);
                http.send();
            }catch (err){
                continue;
            }
            if(goodCode(http.status)){
                existing[l] = links[l];
                console.log(links[l]);
            }else{
                if(http.status == 405){
                    try{
                        var http_get = new XMLHttpRequest();
                        http_get.open('GET', links[l], false);
                        http_get.send();
                        if(goodCode(http_get.status)){
                            existing[l] = links[l];
                        }
                    }catch (e){
                        continue
                    }
                }
            }
        }
        return existing;

    }catch (err){
        return [];
    }

}

function getVideoList() {
    let links = findAddresses();
    let existing = checkLinks(links);
    return existing;
}

getVideoList();
