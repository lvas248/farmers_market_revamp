class User < ApplicationRecord

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_secure_password

    has_many :verifications
    
    after_create :send_new_user_email_verif

    private

    def send_new_user_email_verif
        #send email with verification code
    end
end
