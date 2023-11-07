var bookMarker = document.getElementById("bookmarkerName");
var websiteUrl = document.getElementById("WebsiteUrl");
var dataBody = document.getElementById("tableData");
var totalRecords = document.getElementById("totalRecords");

var webList = [];
var selectedIndex = null;

function addWebsite() {
    var webItem = {
        bookMarkerName: bookMarker.value,
        websiteUrl: websiteUrl.value,
    };

    if (selectedIndex === null) {
        webList.push(webItem);
    } else {
        webList[selectedIndex] = webItem;
        selectedIndex = null;
    }

    displaywebFromList();
    clearweb();
}

function displaywebFromList(searchValue) {
    var cartona = "";
    var filteredWebsites;

    if (searchValue) {
        filteredWebsites = webList.filter(website =>
            website.bookMarkerName.toLowerCase().includes(searchValue) ||
            website.websiteUrl.toLowerCase().includes(searchValue)
        );
    } else {
        filteredWebsites = webList;
    }

    for (let index = 0; index < filteredWebsites.length; index++) {
        cartona += `
        <tr>
            <th scope="row">${filteredWebsites[index].bookMarkerName}</th>
            <td>
                <button onclick="visitWebsite(${index})" class="btn btn-primary">Visit</button>
            </td>
            <td>
                <button onclick="deletweb(${index})" class="btn btn-danger">Delete</button>
            </td>
            <td>
                <button onclick="updateWeb(${index})" class="btn btn-warning">Update</button>
            </td>
        </tr>
        `;
    }

    dataBody.innerHTML = cartona;
    updateTotalRecords();
}

function deletweb(index) {
    if (index >= 0 && index < webList.length) {
        webList.splice(index, 1);
        displaywebFromList();
    }
}

function clearweb() {
    bookMarker.value = "";
    websiteUrl.value = "";
}

function visitWebsite(index) {
    if (index >= 0 && index < webList.length) {
        var url = webList[index].websiteUrl;
        window.open(url, "_blank");
    }
}

function updateWeb(index) {
    if (index >= 0 && index < webList.length) {
        var selectedWeb = webList[index];

        bookMarker.value = selectedWeb.bookMarkerName;
        websiteUrl.value = selectedWeb.websiteUrl;

        selectedIndex = index;
    }
}

function searchWebsites() {
    var searchTerm = searchInput.value.trim().toLowerCase();
    displaywebFromList(searchTerm);
}

function updateTotalRecords() {
    totalRecords.textContent = webList.length;
}