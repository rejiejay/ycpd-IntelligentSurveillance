var Mock = require('mockjs');

module.exports = {
    /**
     * 获取登录用的token
     */
    getToken: (rep, res) => {
        res.json(Mock.mock(
            {
                "code": 1000,
                "data": {
                    "token": Mock.Random.id(),
                },
                "msg": "success"
            }
        ));
    },

    /**
     * 登录
     */
    login: (rep, res) => {
        res.json(Mock.mock(
            {
                "code": 1000,
                "data": {
                    "token": Mock.Random.id(),
                    "name": Mock.Random.name(),
                    "type": 1,
                },
                "msg": "success"
            }
        ));
    },

    /**
     * 登出
     */
    logout: (rep, res) => {
        res.json(Mock.mock(
            {
                "code": 1000,
                "data": {},
                "msg": "success"
            }
        ));
    },

    /**
     * 校验滑动图片距离是否正确
     */
    checkImage: (rep, res) => {
        res.json(Mock.mock(
            {
                "code": 1000,
                "data": {
                    "token": Mock.Random.id(),
                },
                "msg": "success"
            }
        ));
    },

    /**
     * 获取人机验证码图片
     */
    reqCheckImage: (rep, res) => {
        res.json(Mock.mock(
            {
                "code": 1000,
                "data": {
                    "token": Mock.Random.id(),
                    "oriImagBase64": "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACgAWgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxoCnBaAKmRa6kixgjzUgiNTJHUwQDryKtIi5XWOp1izTtuKmjGPpVqwuVjVXbUg5pWjB70oXFVzMXs0IY/SlCHFSqBilJApjUUhqxZqVYgKYp5q1Eu6mtRtWQ6OHI4qTyTnpUsKkNiriRZroitDkm2igUHpTWi4rSNvntUTw1okcs5My5I+KrmKtKSI1CY62UdDzKlR3KRjppSrhippjo5SVMrBQO1MZcmrZjzTPKx1pcpSmVlXC0wrz0q95II4yTTkhGCT1qGjaN2zPcPjB6VCY+K0JIveq7Lniszfl7FIqBQy5qz5NJ5XNQzRRKvknFBiIq2F5pW24xis5abG9Omn8Rn7eaTbk1ZZeeKbtFS2zVU4lcrTdtWjHxUTLU3KcEQkUwipiKaRSaFoQEU0ipSKaVpWBshIpMAVKRTSKROpGabTiaaagaENJilpKRQhopTRSsM0xF7U4RkVbSMGn+XjtRY6kyBAanwSKkjjX0qbysYx0ppDK4jJHSlEZrTiiXy+QKZJsBwBV2He5TRTUmDjBpx9hSjmi5XI2MApyRljUoiJ5pyKQelFy1THx2+avwWhqvHkVdhc8VamkP2LZZjtPUZq2LfA6UyCX9a0YsMOetbQmceIw7XUo/ZyR0pjW5xWvsyOlRtBmtlI86cbaGG9vULW3tW61t7VEbY+lbKRxSo3MFrQ0z7NW6bf2qNrYZqucz+roxxagDOeaPs469a1pIiOMVXaLjFK9y1BLoUVjMnAXAFQPA2TxV44i4FMIYjnpWcjppJNWktTLkj29ar7STxWxLbBhnNV/s4HGay5jqlQfQoFcU0x8ZrQazYjKrxUJtzj1NS5o0WGmmuxnEHtUZBJrQkhZRzwKqlO9Z81y3R5SHbSbeKkYY70zNO6IcWRMDUbCrOM9ajZai5pyq2hWNMOKsGPNRNHSuTyMiJFRMasNFgVEymlcTg1uRGmNUhBppFSxbEJWkIxUxFMIpMRHRinbaCtTYYzFFOxRSsFzejzWpZxCT7y8VQSJvSrcDSxdM0kzucbmgNPUnKip49PU9f1qOCeYrmpGnmY8rg1d0CjIivLXylGw/hWcYyTW9Faz3CZxmpI9MzksAMdahu50Qj3MBYz3FSrD3rUuNP8sZXkGovs+xckGpubqBVWOnCL3qwsYPanKF7incpQI44ganjiIanKF7VIFz0ouaxpl6BVx1rSsGHmEHGPU1x/idXHhi8+XA+TP/AH2tebgGu/CYaVdcydvkcWMqRptQtfQ+kFt1YAgg/Sg2g9K+cRkd6kA4r1qWUuf2/wAP+CeNJR6I+hja89KY9pXz4TimFjVVMrUN5/h/wSFC57+1up7VSudkJ6c14Zu7U3OaxeDS2l+H/BH7KPU9gnuHYkCqjyY6Ek1n+F5Avh20GzJ+fr/vtWsVEjfdC1xybjJotUYlXJJ5pp3k9OKti3DHgVN5IiGZBgfSp5gVBXM75m4wc00REnGfyrSaVCPlQA1UmYDgKQPap5i/Z66EEoKrjd+FQoVz8xxSsOcnOPSmMqk8cVkzp6phKkT5IJqo0K+tWWG0dagcg96z5bGzmnuiq6ioSoqw6g85pn3eozT2MXq9SAjHamHcTUzyk/w4FROSaVm9yHOK2I3RsZLVXbg9anOTTSh9KfKYyqJ7EBY0xsmp2WoiBRYhuTITTSKmIppGO1InUiIpMCpMe1NIpMNSNqjINTEUwioKRHiilIopDsdhFsyPkrWtoYJB8o59DVGEwjtmtO12EjaKx5z1/ZFmNFiIBAFPlijLDpVgQrIAe9ULqJxNgUc5caZejcxR4VlGe2Kfa20ssjEk0y0tAQCxFWHvFhzFlgCKnmRsoPoiC4hCSAb1/A02QQiA5ZS3bFV5F8w8HilWA96lzR1QosqEZPFKICegNXPKx0FOUNU+1NvYlVbcjrmrCRY7gVOUlbtR5B/icCjn8ylC3QxfFalfC158/wDc4/4GteZrj1r1HxZAo8J3zAMceXzj/poteXBa+kyRt0m13/RHg5srVl6fqx4Kj3pd3oKTbijAr6ZSmvI8kaxJ4NMJp5xmmmuKreTbuUhtGKdSCufkuxnpnhK2eTw3aMMYO/8A9DaugS3XHJOfpWb4IgDeGLKQkj7/AB6/O1dFlYjlSF/CvCrztUkl3Z1RpcyTZTEUS9TyKjdgxHyruHarMksRYfKp564qK5g3/MhTH1ArFy7m8YPaJn3Pmg52c/Wqbserhi3pV19mNu1frnmohAJD8qkntxVpmVReZmyEsfSouh6ZrVktfKJVtoPoDUPkQ55fj6GqsYuUV1M9gepXiq8gB6CtGQwjoGP1qq4B5xS5US5tlFlqNlNWX46JUR3HsKNCWmViAOppmBmrDR+tRmPPalclwIiVFRueKn8o/wB3mlNs4GWXApEpWKeM1Gwq20eKiKH0qWx8tyuVpuw1Z8o+wppQDqalsagVytIV9qsEegqMqam5fKkVytNK1OV9aaV+tK6FZsg20U6RljGWwv1oqeZC5GddGhJ4FXoQ46Cp44V7CrsVuo615TxFj7KOCQy3a4Ugg1ZeOa4I3Lg1dtlQEdPyrQEcB5Gc/SsnirG6wSRQgh8uEKzg/wBKrT2hlkznNbSRIeMVaS3QDoKy+tdi1hoxepz0WmnOeTV6HT1JG4VsLab/ALq8+wpzWjxY3gqPcVHt5s0/drRFeDSIpjgFR9anHhxf4Zkz6YqzGAF+ViR3wMVt2ErHAcLsI6+lbQk3ucOIqSjrE5v/AIRwg/O3H0qUaHZYxlt3uQBXQC8sxK/2iZNmcfLzRNdaO52BlkBPOFI/pW6ucjxE3umefePtHEHgLU51K7V8r7pz/wAtUFeF4xX0r8Rtt78P9RstOtZZpG8vy44Yy7HEqE8DnoDXgLeGvEGONB1P/wABJP8ACvtOHpUIYSTnNJ8z/JHiY+VSrVTt0/zMnI9aCARV5vD2uL97R9QH1tn/AMKT+w9ZHH9k33/gM/8AhXrrHUnu195xeyn2ZQxz0owMVf8A+Ef1s/8AMI1D/wABn/wp6+HNbfpo2on6Wrn+lQq9JvRr70P2c+xmYFKAK1P+EZ14Y/4kmpc9P9Ef/Cnf8It4h/6AWqf+Akn+FNVKV73X3oXJLseueAY4f+EC052EZb97wev+satia243rFk/lUHgDSLy38HWFvd6VPFKok3CZCjDMjEcHnoRXWS6VgblLRIB8zM/QV8bipJ4mdu7/M9WnU5YJeRxU8EoXMiABuhC81WazmZxtIPH+eK6mcWgmSKJ5J3PGQMKPzpJ4YLf55sAEdSpH6VCnYTnc5uDS4HYNMx+gFPfT2iV4kchTz05NWLrUWiJW3+XPXy4wp/Pmsee8difnmx/tNmtVJsydOXYqy2iRy9ueuDVS4CgkRA4FXBKuQQPr3pGjg3bjLgHsCDWnMQ6bvcxZAR1H61CsbE8ZrpGGmbfmDBx27VTkETE+SjbR3Apc4vZLqzIaJh1qu0ZzxWm/wAxIA/OovI3A4LZ9hS5i+RWKDwnHNQGI+v61qtaDjLHPptqOSFUOD1qeYhxTMwq+OMimETNwWP51p/Ivrion+Y5wcfTFHOT7JPoZ5iem+WwPJxWgWBGBHioLiZbaEvLtRfcdahzH7FsqmI9RmmmPPaqMuvnOEiyPdsf0quNel3YaJdvt1qfaojkSNMqR1qN8AZPFVZtZgWLdF8zHse1Y91fTXR+c4Xso6VEqi6FJJItXOo5JWAcf3jVB7iZurtz71Hk4xSVg5NgBJPU5ooCmikB7BHDN2q3FHMOpFWYkQfxGrKxKe5NeVKqffRpWI4iVAzVhZT/AHgKBAPc07yQD901nzRZpZosQTAHLPV1LmM9MflWUY5ewFKsV0Ohp2T6mTTNxJ/SnySzOOpP41lw/aBjNXVeTHJNZSunoQ4dRw88jBOB6VcjlcpsaRtvoDiqqyN3/WniYD0qlKREo36GpaWkc8yqWAHfI611VpplqqghE/IYriI7lgeDWhb6reRptWfap/2Qa6KVTl+I8zFYarP4Wdqq26jAK8fhWbf+U8TopBbGANw6/lWMt8sg/fO8h/3yB+VV2ljzkDrW3tk9kcMMHNPVkkmkvIduGUkckgc/pTm8OPIQcoARhuQB9RRHMqjdI4K5+7nmkuNatiQoXeo6Bq0VRvYp06iejI5NEEGDuif1UEn9BUkENkqH7TG454+Xb/OoRrTDiKLy1P8Ad6U37aXILhj6ZOTR7Rmqoza1HtdWgLBLST0J87PH1q8t/HDYAWkKRyZ5875qymvYl6j9KryagA2UUAfSqU29kJ4WL3ZPLq+rsWG4KpH8K4/GsyQ38xzPM8g6fvCSKtnUHfGzCY7qTzVOe8MjfMS1bRnLawlhqa1sVPscqSA7zkGpZWefAlCsRxnGDTHuDklc/nVRpGJ/hB9q1Tk9yXCC2Q9oN8hXcgx6sBVGeKJJCMhvcc1I7di7H2FQN1+WIfjWiIbbBorURBlfLf3cc1Aywt0tGJHfNTbZj0wBStYTGPcXwOvWk6iW7BYeUimywyZAtCp9uagZMc4hUDt3pZmVGIO4mq7ykk7UNWmzJ04rRj5Iojhty5qFgNuA+foo/nUbmY9EqF4p36nFHzJaXYV4x/8ArqFgo7j86bJCVGXcge9RtakEAhsn1FF/MjboO8xB1YCo2nXBxk042E4GfK4+oqGYC3VTM6xqzbQWOBmpbj3HzNdCG6v1tbdpnU4Xt0zXIahqE1/NufAA4VR0FbGu3dq8UUEMyTNncWXotc6xANZSfYxnNvQTp+VNY8CgntTCagxDPFIaKKBCU4LmkHJFTcnJoGM7UU8AAZPNFAXPUbfV0yN24/jWpDrNscZZhXDJKRU6TH1pSwcJHt082qx31PQItTt26TCr0U6SdHVvxrzmOcjvVuK8dejGuaeXJ7M7IZxf4onoqMh6gVKAh9fwrhYdYuY8AP8ApWhF4iuVx0NcksuqLZnWswoy62OtRoQeSasCe2wPlYmuUTxFuP72FfwqzHr8A6RP+dZPA1e34lfWKMlfmOh3ofux4/GnDnsBWOviKIrgxn8aP7eh/wCedOOGqr7Ie2h3Nocd6XcexFYf9uRH+E/nTRqvOct9M10Rw9TqiXVp9zollC9WFOWRWPBJrnxq5z3p41Z60WHn2MnUp9zoCqnqaZtt164JrDbU2bv+VOGpkLgY/KrVGZm5w7m4ZYFAy2KY19bjhVZj9awjeAnOP0pRejoatUO5m6i7mo976QqPqahN256AD6CqIvE75o+3J71qoeRi5LuW2mlIwTj6cUzymlJwCTVf+0lH8GfqaZ/azKTt4+lVaXREuUerLBt8dQRUckR6BM1AdXYdgfqKQ67MPu7V+gotUFzUydbKdukJH/Ac1nR3ltLqJshIwcAYYxsFJJxgNjHp370tz4jnhheV5WKoMnArzqXxVqX27zlucrwuGUEbQcjiqUKj3OariKdO2p6vJbwxKP8ASV98cmqDqGyN5b6VkW+tG4top04DjI4xStqkp/iNJUZm31iFtzQ8pVBzDuPbOarPbOfUVRbUZcfeqB9QlP8AGfyrRQmZSrQNEWy5+Zz+VSLFDF0YjHesJ72Vv42/Oql1qAtIjLNKwHbnk0nSk92Z+3h0R0NwtvKmHy3pk9KrCeFoEdhztBJJribrxM5yIogB/tHJrIfULp7b7O0h8nAAj4rPlS6mbxKvojubvxDp1tK0TMzMvZRmuT1rWJ9V+RVEMCnIj7k+prI8w9M0SSY5oSRhOq5EZU5I5NNIIHQ/lSmX6j8ajZiT60zEX603FLnjpzSE0gEopKWgByfeqQk5JqOMZbnsKVjx70DActz0opgODRQB2CrUqiqylvWpFB9a6jVMsqPepl471VVT61KsfvSuWiyre9Tq/vVVY6mVRSbRoky0svvUiy+9VlAqVai6NkmWll96kEtVFJqRSad0UrlxZakWU+9VFJqZTU8xWpaWU08SmqoYD/8AXSGX/Oaq4rl8T+9PE4rN84etL53vTFzml9oHrSfaBWYZ/emG496aJczVNyKabkVkm496abj3pkOZqG6FRtcisw3A9aja4HrVGbmabXI9ajNyKzGn96aZ6aIdQ0WnWQFSAQeoNcFfxRQ3so6KJDgZ7Zro76YGyly+zj7wOK5O7nSY8ygkdTRJqxzVZN2OxGtaesOYplCKOABjFPbU7bGd5OemAa42GGcabJcIV8oHaRnk9P8AGkmuZsDPBGccn1zUe1tuXzM67+0rdiBvwT68UyTULZF3NOgHrmuPS8aEqzlsqc8E+mKrzXIlVVLNtXOPzzR7fQm7OnuPENtEreV+8b+HHA/GsK6u5bmYyzNluyjotUSwUjO7PWneaBzk89KxlNyBMa3Jxg5zTzxg4FMBBPXmnEtjOeKgoYw+bPemPk81KSQKjJJoIIqM0pPtSE5NACE0U4EDjAP1qRWUn7o/I0AQ4oqxgFmGFwD6mmlV3Hj6YNA7ES8Z4pDUpC5Ocj8M03yxjIbPOKBEf4UU5lI6iigDrFqZTVdTUimt2zoSLSEVKDVZTUgNQ2axLAapQarBqerVLZsiwDTwx9arhqeGqbllkE+tPDH1qsGqVWouMtKT61KpNVFap1alcVybmmkn1pvmUxmNUmJkmT60hNQ+ZSGSquZkpJ9aYc+tRGT3ppk96q5LJT9aafrUZf3pm81VzNkpx61GcVXmvYYlYlxlewPOabHdrLCsucAjPPGKdyCxxSYFQSTxxR73dVX1zWFeazLNlYhtXoOefxocrEuxXvNQmuJGUv8AJnG0dOtUzEZJSFXJNRMW3gZ5J+tWVU4zn5cYGO1YOTZmlcfkQx7Bkkdc8AmmHHlnklu5z0phJxkk8UkkhIx2xUlEE/OcNn8MVHBF5smO3U05jxzVi2jIj9zTI6kTghvX29Ka2RgbfpVhRiZs4wPWlcKDxkk96Q7FYRk/MSMr2ph9VyOamcYbtzTGYKABzxTEyLzGJANBkJ7fzpB97Jpp4oEOyznGBTSMcd6kj6HjPFNIHU0AMqaLaCd+fwpmfSmk0gJGcAkgnmoy2etIaQDmmAuSOQealDFozk5+tR9KM4FADxkeoHtyKKjyR0ooA6ZWqUNVVfrUgx61obosrJUof3qmCKkBWg0TLQlp4lqqGFODD0FQzVMtCanib3qqGHoKcGHoKRV2WRP708T+9VRIPSlDCgLsti4x3qQXfvVQEe9DyRRIWdtqjqSaCbsu/bB/epDeD1rOhvba4B2NnHrxTmmiAzkYqkZubLpvB6Uw3o/u1Saf0Bpm9m9RVWIcmXjej0pjX4ql5eeuacIhVaE80iY3/oDVebVliJU/e9KeFArEvmAvpvbH8qmTsiLsjeY44zliD+VPW+YLsbZnaVzzUJK7evI6VUYkjng1ncTNK6uxcRjLYKn1+lUXkHODgfWiMjPTkdAKY8TbScYPpQwJLcK0gY89gKuzzKFKjgAcAdBUFpCpiVmOAOcUXEgbJxx2pAtERbtymlfjPuKcigr3HajG0YxQMrgbmx2HWrat5cWR1FUgQGJxU4lTPJFBKZJEDyTwOp4pspIkG05pQyBdzHDdemRVZ5SWLAUAx7nsDzUOMnrmkPrR17GgkUgetNx6nipFIP8ACD7UxyM8KB9KAAEDoKQt+VKcbO+aZQAtJxSUUwFpQeeBSAU44yDQAMCOTTaczEikGMc0AJiilJ9KKAP/2Q==",
                    "cutImagBase64": "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAoADwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCCFbhjkRke9acX2qFdwbk9iaWyZnYK7it6KwtMK1xMuOuAea6ITsz2sRC6K9h500WZSN3bFWpI1jXc3OKkS9sLfKxxtz0461Sv9Qdo2CQKoPAOCa6VO54k6HvFG8vWhPyhcGs8akUDGQqSelRTtMkZDHdnueoqmz71wVP41rGQewTQ6e7klbaX4quSgPJOaaYyTletL5c393PvWilcl0rG9a2QblN2PUitePTSI1kADZ4PPIq2thJC+CwfB5wOn51c/d+XsVk/qK8OEnc+krzi17pQFuh5jyW7nODWffxF1UPMTjqM1vC3imBGQT3IBxWbcWEMbbAshY9gtbe2S0OONBydzAe3j2lsFvc1X2jGNmBXRrp4L+WRjjoRVSawiUHkb/TNdEKiZNSny6GII/n4z+dKVcnPNasGnx+aQ0mG9hmtJdPhC4+dsd8CtHUtsc7hfc6W8vNMK42GYj+GPOBXJXcs3nOYlaND0xRRXkxqO9j06FKKQ20v5LWNkZHfPI+biln1O4n4UbfcCiit4pN3Zb0QyJLiY8yke5OKnTTinzMyn1IJoopyk1sY8ierJ2iwMqqouOcDNPVYsfNO2fZDRRTTZlUSR//Z",
                    "yHeight": 39,
                },
                "msg": "success"
            }
        ));
    },
}


