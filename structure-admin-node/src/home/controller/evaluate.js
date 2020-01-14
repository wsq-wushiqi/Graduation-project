const Base = require('./base')
module.exports = class extends Base {
  async addEvaluateAction() {
    let l_id = this.post('l_id')
    let c_id = this.post('c_id')
    let u_id = this.post('u_id')
    let ce_fraction = this.post('courseScore') // 课程评分
    let ce_advise = this.post('courseAdvise') // 课程建议
    let le_fraction = this.post('lecturerScore') // 讲师评分
    let le_advise = this.post('lecturerAdvise') // 讲师建议
    let oe_fraction = this.post('otherFraction') // 其他评分
    let oe_advise = this.post('otherAdvise') // 其他建议
    let place = this.post('place') // 场地
    let discipline = this.post('discipline') // 纪律
    let boardAndLodging = this.post('boardAndLodging') // 食宿
    let other = this.post('other') // 其他
    try {
      let u = await this.model('user').where({ u_id: u_id }).getField('u_name')
      let c1 = await this.model('course_evaluate').where({ c_id: c_id }).find()
      let l1 = await this.model('lecturer_evaluate').where({ l_id: l_id }).find()
      let o1 = await this.model('other_evaluate').where({ c_id: c_id, l_id: l_id }).find()
      let advise = ''
      let ids = ''
      if (think.isEmpty(c1)) {
        advise = u+':'+ce_advise
        ids = u_id
        let c2 = await this.model('course_evaluate').add({ c_id, ce_fraction:Number(ce_fraction), ce_advise: advise, ce_ids: ids })
        console.log(c2);
      } else {
        let score = (c1.ce_fraction + Number(ce_fraction))/2
        advise = c1.ce_advise+','+u+':'+ce_advise
        console.log(c1);
        
        ids = c1.ce_ids + ',' + u_id
        let c3 = await this.model('course_evaluate').where({ c_id: c_id}).update({ ce_fraction: score, ce_advise: advise, ce_ids: ids })
        console.log(c3);
      }
      if (think.isEmpty(l1)) {
        advise = u+':'+le_advise
        let l2 = await this.model('lecturer_evaluate').add({ l_id, le_fraction: Number(le_fraction), le_advise: advise })
        // let grade = await this.model('lecture').where({ l_id: l_id }).update({ l_grade: Number(le_fraction) })
        console.log(l2);
      } else {
        let score = (l1.le_fraction + Number(le_fraction))/2
        advise = l1.le_advise+','+u+':'+le_advise
        let l3 = await this.model('lecturer_evaluate').where({ l_id: l_id}).update({ le_fraction: score, le_advise: advise })
        // let grade = await this.model('lecture').where({ l_id: l_id }).update({ l_grade: score })
        console.log(l3);
      }
      if (think.isEmpty(o1)) {
        advise = u+':'+oe_advise
        let o2 = await this.model('other_evaluate').add({ l_id, c_id, oe_fraction, oe_advise: advise, place, discipline, boardAndLodging, other })
        console.log(o2);
      } else {
        let score = (o1.oe_fraction + Number(oe_fraction))/2
        let splace = (o1.place + Number(le_fraction))/2
        let sdiscipline = (o1.discipline + Number(discipline))/2
        let sboardAndLodging = (o1.boardAndLodging + Number(boardAndLodging))/2
        let sother = (o1.other + Number(other))/2
        advise = o1.oe_advise+','+u+':'+oe_advise
        let o3 = await this.model('other_evaluate').where({ c_id: c_id, l_id: l_id}).update({ oe_fraction: score, oe_advise: advise, place: splace, discipline: sdiscipline, boardAndLodging: sboardAndLodging, other: sother})
        console.log(o3);
      }
      return this.success('提交成功')
    }
    catch(e) {
      console.log(e);
      return this.fail('提交评价失败')
    }
  }
  async checkEvaluateAction() {
    let u_id = this.post('u_id')
    let c_id = this.post('c_id')
    try {
      let iid = await this.model('course_evaluate').where({ c_id }).getField('ce_ids')
      let idList = (iid).toString().split(',')
      for (let i = 0; i < idList.length; i++) {
        if (u_id === idList[i]) {
          return this.fail('此课程已经评价过')
        }
      }
      return this.success()
    }
    catch(e) {
      console.log(e);
      return this.fail('获取评价表失败')
    }
  }
  async getCourseEvaluateAction() {
    try {
      let course = await this.model('course').select()
      let evaluate = await this.model('course_evaluate').select()
      let result = []
      for (let i = 0; i < evaluate.length; i++) {
        for (let j = 0; j < course.length; j++) {
          if (evaluate[i].c_id === course[j].c_id) {
            let c = course[j]
            let e = evaluate[i]
            result.push({
              c_name: c.c_name,
              c_hour: c.c_hour,
              c_date: c.c_date,
              l_name: c.l_name,
              ce_fraction: e.ce_fraction,
              ce_advise: e.ce_advise
            })
          }
        }
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取课程评价列表失败')
    }
  }
  async getLecturerEvaluateAction() {
    try {
      let lecture = await this.model('lecture').select()
      let evaluate = await this.model('lecturer_evaluate').select()
      let result = []
      for (let i = 0; i < lecture.length; i++) {
        for (let j = 0; j < evaluate.length; j++) {
          if (lecture[i].l_id === evaluate[j].l_id) {
            let l = lecture[i]
            let e = evaluate[j]
            result.push({
              l_name: l.l_name,
              d_name: l.d_name,
              l_education: l.l_education,
              le_fraction: e.le_fraction,
              le_advise: e.le_advise
            })
          }
        }
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取教师评价列表失败')
    }
  }
  async getOtherEvaluateAction() {
    try {
      let lecture = await this.model('lecture').select()
      let course = await this.model('course').select()
      let evaluate = await this.model('other_evaluate').select()
      let result = []
      for (let i = 0; i < evaluate.length; i++) {
        for (let j = 0; j < course.length; j++) {
          for (let k = 0; k < lecture.length; k++) {
            if (evaluate[i].c_id === course[j].c_id && evaluate[i].l_id === lecture[k].l_id) {
              // console.log(i);
              let l = lecture[i]
              let c = course[j]
              let e = evaluate[k]
              console.log(l);
              console.log(c);
              console.log(e);
              
            }
          }
        }
      }
      return this.success(result)
    }
    catch(e) {
      console.log(e);
      return this.fail('获取评价列表失败')
    }
  }
}