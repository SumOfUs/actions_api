require 'httparty'

data = {
  type: 'action',
  params: {
    page:  "foo-bar-petition",
    email:  "hello@example.com",
    name: "Bob Marley",
    country: "United Kindom",
    page_id: '1',
    source: 'fb',
    referer: "http://google.com",
  }
}


HTTParty.post('http://localhost:3000/message', body: data)
