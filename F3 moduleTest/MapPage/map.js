let locationData = JSON.parse(localStorage.getItem("data"));
let latitude = locationData.loc.split(",")[0];
let longitude = locationData.loc.split(",")[1];
let ipAddress = locationData.ip;
let map = document.querySelector("#map");
let message = document.getElementById("message-span");
let pincode = locationData.postal;
let search = document.getElementById("search");
let postContainer = document.querySelector("#postOfficeInfo");
let arr = [];
/*-----------------------------------------------------------------------------------------------------*/

/*setting innerHTML------------------------------------------------------------------------------------*/
document.getElementById("ip-address").innerHTML = ipAddress;
document.getElementById("lat-span").innerHTML = latitude;
document.getElementById("long-span").innerHTML = longitude;
document.getElementById("city-span").innerHTML = locationData.city;
document.getElementById("organization-span").innerHTML =
  locationData.org;
document.getElementById("region-span").innerHTML = locationData.region;
document.getElementById(
  "hostname-span"
).innerHTML = locationData.hostname?locationData.hostname:"NA";
document.getElementById("timezone-span").innerHTML = locationData.timezone;
document.getElementById("pincode-span").innerHTML = locationData.postal;
document.getElementById("date-span").innerHTML = new Date().toLocaleString(
  "en-US",
  { timeZone: `${locationData.timezone}` }
);



/* map */

map.setAttribute(
    "src", `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`
  );
  


  function postOffice(pincode) {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        message.innerHTML = `${data[0].Message}`;
        arr = data[0].PostOffice;
        console.log(arr);
        // search.style.display = "block";
        showData(arr);
      })
      .catch((error) => {
        alert("Error while accesing the post ofiices near by you...", error);
      });
  }
  postOffice(pincode);



  function showData(arr) {
    postContainer.innerHTML = "";
    let innerHtml = "";
    arr.forEach((item) => {
      innerHtml += `
          <div class="post-content">
          <div><strong>Name:</Strong> ${item.Name}</div>
          <div><strong>Branch Type:</Strong> ${item.BranchType}</div>
          <div><strong>Delivery Status:</Strong> ${item.DeliveryStatus}</div>
          <div><strong>District:</Strong> ${item.District}</div>
          <div><strong>Division:</Strong> ${item.Division}</div>
         </div>`;
    });
    postContainer.innerHTML = innerHtml;
  }



  search.addEventListener("input", () => {
    let filteredArr = arr.filter((item) => {
      if (item.Name.toLowerCase().includes(search.value.trim().toLowerCase())) {
        ;
      }
    });
    showData(filteredArr);
  });


  