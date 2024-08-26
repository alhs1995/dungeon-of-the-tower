function test() {
  return new Promise((resolve) => {
    resolve(
      '我:<br>測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試<br>顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示'
    )
  })
}

function getGameNowData() {
  return new Promise((reslove, reject) => {
    try {
      reslove({
        content:
          '我:<br>測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試<br>顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示測試顯示',
        selection: [
          {
            context: 'test1',
            desc: '测试说明1',
            value: 'test1',
            sort: 1
          },
          {
            context: 'test2',
            desc: '测试说明2',
            value: 'test2',
            sort: 2
          },
          {
            context: 'test3',
            desc: '测试说明3',
            value: 'test3',
            sort: 3
          },
          {
            context: 'test4',
            desc: '测试说明4',
            value: 'test4',
            sort: 4
          }
        ]
      })
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  test,
  getGameNowData
}
