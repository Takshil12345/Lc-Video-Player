console.log("HI");
console.log(window.location.href)

let showVidePage = false
let lastSet = "description"

if (window.location.href.startsWith("https://leetcode.com/problems/")) {
    // Create the video column element
    setTimeout(async () => {
        const parent = document.getElementById('ide-top-btns').firstChild;
        console.log(parent)
        const newChild = document.createElement("button");
        newChild.id = "video-button"
        newChild.textContent = "Video"; // Set content
        newChild.addEventListener('click', display);
        parent.appendChild(newChild);
        console.log('hi')

    }, 3000)

}

function make_display_none(arr) {
    arr.forEach((item) => {
        item.style.display = 'none'
    })
}


function display_search_result() {

}


async function display() {

    showVidePage = !showVidePage
    console.log(showVidePage)

    if (showVidePage) {
        // Get the element with class "flexlayout__tab" and data-layout-path="/ts0/t0"
        const description = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t0"]');
        const editorial = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t1"]');
        const solution = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t2"]');
        const submission = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t3"]');
        const tabBar = document.getElementsByClassName('flexlayout__tabset_tabbar_inner flexlayout__tabset_tabbar_inner_top')[0]

        const arr = []
        arr.push(description, editorial, solution, submission, tabBar)
        for (let i = 0; i < 4; i++) {
            console.log(arr[i].style.display)
            if (arr[i].style.display !== 'none') {
                if (i === 0) lastSet = 'description'
                else if (i === 1) lastSet = 'editorial'
                else if (i === 2) lastSet = 'solution'
                else lastSet = 'submission'
                console.log(i + "," + lastSet)
                break
            }
        }
        console.log(lastSet)
        make_display_none(arr)

        // console.log("HELLO")

        const alreadyPresent = document.getElementById('sendanamakwalichut')

        if (alreadyPresent) {
            alreadyPresent.style.display = ''
        } else {
            const header = document.getElementsByClassName('flexlayout__layout')[0]
            // console.log(header)
            // Create a new div element
            const divElement = document.createElement('div');

            divElement.className = 'flexlayout__tab';
            divElement.setAttribute('data-layout-path', '/video');
            divElement.id = 'sendanamakwalichut';
            divElement.style.left = '0px';
            divElement.style.top = '36px';
            divElement.style.position = 'absolute';
            divElement.style.setProperty('--width', '655px');
            divElement.style.setProperty('--height', '820px');

            const h1 = document.createElement("H1");
            h1.textContent = "Video Solutions";
            h1.style.fontSize = "3em";
            h1.style.marginBottom = '40px'
            h1.style.marginLeft = '20px'
            divElement.appendChild(h1)


            const data = await fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMioTPkZ9q7-3O9mPc-qxuKBj1_IZrdEs&q=joji&type=video')

            const result = await data.json()

            result.items.forEach((item) => {
                console.log(item.id.videoId)
                const outsideDiv = document.createElement('div')
                outsideDiv.id = `${item.id.videoId}`
                outsideDiv.style.marginBottom = '20px'
                outsideDiv.style.marginLeft = '20px'

                const videoPlayer = document.createElement('iframe')
                videoPlayer.width = '60%'
                videoPlayer.height = '300px'
                videoPlayer.style.display = 'flex'
                videoPlayer.src = `https://www.youtube.com/embed/${item.id.videoId}`

                outsideDiv.appendChild(videoPlayer)
                divElement.appendChild(outsideDiv)
            })

            header.appendChild(divElement);

        }


    } else {
        console.log(lastSet)
        let currentItem;
        if (lastSet === 'description') currentItem = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t0"]');
        else if (lastSet === 'editorial') currentItem = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t1"]');
        else if (lastSet === 'solution') currentItem = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t2"]');
        else currentItem = document.querySelector('.flexlayout__tab[data-layout-path="/ts0/t3"]');

        const tabBar = document.getElementsByClassName('flexlayout__tabset_tabbar_inner flexlayout__tabset_tabbar_inner_top')[0]
        const insertedVidePage = document.getElementById('sendanamakwalichut')

        console.log(currentItem)
        insertedVidePage.style.display = 'none'
        currentItem.style.display = ''
        tabBar.style.display = ''
    }
}

// <div class="flexlayout__tab" data-layout-path="/ts0/t0" id="a9522ade-33ca-4b15-8c6e-9d9748ac2c65" style="left: 0px; top: 36px; position: absolute; --width: 655px; --height: 820px;"

// AIzaSyBMioTPkZ9q7-3O9mPc-qxuKBj1_IZrdEs