let axios = require('axios');
(async function () {
    let { headers, data } = await axios.get('https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&before=2.0562661101203&limit=20&category=5562b415e4b00c57d9b94ac8');
    console.log(data);
})()