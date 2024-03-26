// ข้อมูลเกี่ยวกับผู้ประกอบการและนักศึกษา
const businesses = [
  {
    name: "Business A",
    expertise: ["Web Development", "Marketing"],
    image: "business_a.jpg",
  },
  {
    name: "Business B",
    expertise: ["Graphic Design", "Social Media"],
    image: "business_b.jpg",
  },
  {
    name: "Business C",
    expertise: ["Mobile App Development", "SEO"],
    image: "business_c.jpg",
  },
];

const interns = [
  {
    name: "Intern X",
    interests: ["Web Development", "Graphic Design"],
    image: "intern_x.jpg",
  },
  {
    name: "Intern Y",
    interests: ["Marketing", "Social Media"],
    image: "intern_y.jpg",
  },
  {
    name: "Intern Z",
    interests: ["Mobile App Development", "SEO"],
    image: "intern_z.jpg",
  },
];
// ฟังก์ชันสำหรับสร้าง card
function createCard(entity) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3");
  card.innerHTML = `
        <img src="${entity.image}" class="card-img-top" alt="${entity.name}">
        <div class="card-body">
            <h5 class="card-title">${entity.name}</h5>
            <p class="card-text">Expertise: ${entity.expertise.join(", ")}</p>
        </div>
    `;
  return card;
}
// แสดงรายการของผู้ประกอบการหรือนักศึกษาฝึกงาน
function displayList(entityList, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // เคลียร์เนื้อหาเก่า
  entityList.forEach((entity) => {
    const card = createCard(entity);
    container.appendChild(card);
  });
}
// ฟังก์ชันสำหรับหาคู่จับ
function findMatches(entity1, entity2) {
  const matches = [];

  entity1.forEach((item1) => {
    entity2.forEach((item2) => {
      const commonInterest = item1.expertise.some((expertise) =>
        item2.interests.includes(expertise)
      );
      if (commonInterest) {
        matches.push({ business: item1.name, intern: item2.name });
      }
    });
  });

  return matches;
}

// แสดงผลลัพธ์
function displayMatches(matches) {
  const matchesDiv = document.getElementById("matches");
  matchesDiv.innerHTML = ""; // เคลียร์เนื้อหาเก่า
  matches.forEach((pair) => {
    const matchElement = document.createElement("p");
    matchElement.textContent = `Business: ${pair.business} - Intern: ${pair.intern}`;
    matchesDiv.appendChild(matchElement);
  });
}

// เรียกใช้ฟังก์ชันเมื่อมีการคลิกเพื่อจับคู่
document
  .getElementById("internList")
  .addEventListener("click", function (event) {
    const selectedIntern = event.target.textContent;
    const matchedPairs = findMatches(businesses, [
      interns.find((intern) => intern.name === selectedIntern),
    ]);
    displayMatches(matchedPairs);
  });

document
  .getElementById("businessList")
  .addEventListener("click", function (event) {
    const selectedBusiness = event.target.textContent;
    const matchedPairs = findMatches(
      [businesses.find((business) => business.name === selectedBusiness)],
      interns
    );
    displayMatches(matchedPairs);
  });

// เรียกใช้ฟังก์ชันเพื่อแสดงรายการของผู้ประกอบการและนักศึกษา
displayList(businesses, "businessList");
displayList(interns, "internList");
