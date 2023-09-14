class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :email_verified, :password_digest
end
