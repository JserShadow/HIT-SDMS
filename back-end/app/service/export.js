'use strict';

const { Service } = require('egg');
const phantom = require('phantom');
class ExportService extends Service {
  async getCsv() {
    const result = [];
    const { Studentinfo } = this.ctx.model;
    const stus = await Studentinfo.find();
    for (const stu of stus) {
      const url = `https://hit-sdms.xiaonei.io/transcript?userID=${stu.openId}`;
      const path = `./app/public/pdfs/${stu.basicInfo.name}_${stu.basicInfo.stuId}.pdf`;
      const ph = await phantom.create();
      const page = await ph.createPage();
      const status = await page.open(url);
      if (status === 'success') {
        page.property('viewportSize', { width: 500, height: 800 });
        await page.render(path);
        ph.exit();
      }
      result.push({
        name: `${stu.basicInfo.name}_${stu.basicInfo.stuId}.pdf`,
        path: `./app/public/pdfs/${stu.basicInfo.name}_${stu.basicInfo.stuId}.pdf`,
      });
      console.log(result.length);
    }
    return result;
  }
}

module.exports = ExportService;
