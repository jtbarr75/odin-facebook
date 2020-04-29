class Like < ApplicationRecord
  include Notifiable
  
  belongs_to :user
  belongs_to :likable, polymorphic: true
end
