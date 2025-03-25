const dummyChat = [
  {
    id: 1,
    username: '써니',
    dancername: '써니',
    images: [
      'https://s3-alpha-sig.figma.com/img/1e7f/fb4c/6dd8c11d589395a2dfca5a085f9e1aa0?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m2lgZVa5wM0JdwDo3YLLO5Lk1hvzccBC7e9wOdgmW7qpBR4IUUHyv0AmQUSjIDnMziMgSlWaissUx0GfwhEK4FGOSlDq4O8Ofz2U-0yHl9Uqo9t7o15LPkK0pELK369bhIh181v5YAnJJbL~Bqf43HPOBJdbtSPdt1AzcbGoV0nDAznITTZ5RjPKydKSOGKnz1dy5q8gWa-9r3vYVEN332yEVqzEZAlY2SMedPL0oApUAEv6QDVGSj4TdlH3iyRo2XbI4ppYwRupViYV9Twd5ozgM1rnEg1Y2HlZckF0dw88j07KB7Ocz097YznQKJfhLrAS5D-fBZpFjo4sT~WP1g__',
      null,
      null
    ]
  },
  {
    id: 2,
    username: '타니아',
    dancername: '타니아',
    images: [
      'https://s3-alpha-sig.figma.com/img/7132/a524/35b5c959d516073619988ac7dbb5e4b0?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4l8rtKd6TtbD1cAIcrGEnWrn5VVlvfMywEh886Mqh8RQzA5ZevjshUGBbyn92uCAskWKhhrS-z2RuhWt6htK47qwjavU6d5554XaHZbXMQXZ~WeMuHlAeGHEBHCW0Zq80jVGHXwN0ZRoSw-oYUG67XYNQWM3tSCI0dVoXUidhZ9Uq7z~rwjeUKpS6cowQpXfsS4crT78Gs8PEDb7Q6x4uBIJoQ4x2qH2QogThsrH5xh5oxJ7m4nCH0Ad6y~CgpNrliecdw9GuEMiii3cU6INBdWK6ZBiiX4o-0aZMyPHFdNt6dvvGesVdhgwL4ig9jD7aTFRo7AIRA-HXaSA6IN4A__',
      null,
      null
    ]
  },
  {
    id: 3,
    username: '뉴비',
    dancername: '뉴비',
    images: [
      'https://s3-alpha-sig.figma.com/img/9048/3291/c1818414ab2b4e8bddd888f76bde565d?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M8-mnV6c9hp8mC-TW8vnpDcBxe4ykCkWmrl4mrgX6k4aa94AS7IrwZCF3Z1pk627ne8bWENB0IXhy5wz-U1FVwwVzdz8D2nIM~hZ3pStGlN2OjYtjmFhGmUVzVEQTq19Mj8S53UWKRsHYKQVKE5HBUz6iv1Cu4pN6bvLr8QfMa6JfkVeQspd27N8E1X5No3zFg45XnPqHpYoM~7Ewv1~iAHHi5HE7iQmmrzowoLQPcAJ6wdWfffl9Dwn9p6fto9TaFE8s-fmfo75ZFL09-bSiTGDrpubIV0Oho2v2qLT5rtBy28s5fG5-mnt1-26SeWPMoyWdnUNZu6W8GeBM80ERg__',
      null,
      null
    ]
  },
  {
    id: 4,
    username: '애니',
    dancername: '애니',
    images: [
      'https://s3-alpha-sig.figma.com/img/ee01/4e31/1d9b7d51d2e83952bf0fbc416ee40d52?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Swbj~X2Cq8seUdpzyPOKsBBUeUFqK0eaAFCNjoVfBZF0eq0NhQ8yrwavcbBhIttlNQ9lmFk69ZC8PJvYwHs97t-4P8NFueUwWqHRel-GCt4FQudiwOuVkzd8JtUkpxNGJ7USspJm55CDjsn5M-SFdRaBh51xKTCidWpoKCXPCnxNbzmr8W-6tYZjRzsfiGna9jRgwxg8fy5rUznC1Ty-0fPuBy0OPnI5eSH-hn8NYmriYNoOOvKeynWCGdhWBRmR80ZNGZl6SdTh9TfNFan5tO1EAF2610ry74FyB6uabH1V~By4g7rGIVU86b-dCiXORA05uslYWsCFtoDlGTQPjA__',
      null,
      null
    ]
  },
  {
    id: 5,
    username: '누누',
    dancername: '누누',
    images: [
      'https://s3-alpha-sig.figma.com/img/7e9c/1d43/78259d9b0a510b08825b03aca97f4b4f?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RjtID7n0hAAQ1UmQP-yXXulyCJ383LoSFVoq2x20hbjaI9-qZWyzR0NZo6~mjqmzRlm7E-kiKZhLIGzPolJ9GxBjjEvOg8O4S8~16QdapZ6MfuE~cCbPebNIsEbOJGEuBg7IlSSYKBKnioEZdeEt7-52W86Un~OJElKCmeDQ5otQTFW3~pz~eh55B6TEeoaHNKVaDPbA31vcH6MWQsecjeuM-AKXbEuqoiCn9Gjibr7YxXWzqR7KvXdgOLN~LAyZfzCRieK0PAi3s1ygM3776Z32TsB0VWRsGFQ4bKLrPG0C2Y1LsKs5Xq9w~xsuV~ZaeVcuGXxF10Wj1rFajvzM3A__',
      null,
      null
    ]
  }
];

export default dummyChat;
