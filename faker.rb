# frozen_string_literal: true
require 'httparty'
require 'faker'
require 'pp'

def data1
  {
    type: 'donation',
    meta: {
      type: 'donation',
      page:  'foo-bar-donation',
      email:  Faker::Internet.email,
      name: Faker::Name.name,
      country: Faker::Address.country
    },
    params: {
      type: 'donation',
      page:  'foo-bar-donation',
      currency: 'GBP',
      amount: rand(100),
      email:  Faker::Internet.email,
      name: Faker::Name.name,
      country: Faker::Address.country,
      page_id: '734',
      source: 'fb',
      referer: 'http://google.com'
    }
  }
end

def data2
  {
    type: 'action',
    meta: {
      type: 'petition',
      page: 'foo-bar-petition',
      email:  Faker::Internet.email,
      name: Faker::Name.name,
      country: Faker::Address.country
    },
    params: {
      type: 'petition',
      page: 'foo-bar-petition',
      email:  Faker::Internet.email,
      name: Faker::Name.name,
      country: Faker::Address.country,
      page_id: '764',
      source: 'fb',
      referer: 'http://google.com'
    }
  }
end

100.times do
  puts 'posting'
  data = [data1, data2][rand(2)]
  pp data
  HTTParty.post('http://localhost:3000/message', body: data)
  sleep 1
end
