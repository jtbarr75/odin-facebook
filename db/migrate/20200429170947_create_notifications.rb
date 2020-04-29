class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.references :notifiable, polymorphic: true
      t.references :user, foreign_key: true
      t.string :message

      t.timestamps
    end
  end
end
