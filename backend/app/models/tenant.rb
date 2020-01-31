class Tenant < ActiveRecord::Base
  #Tenant does not inherit from ApplicationRecord because that is a base model for all the Multitenant stuff
end
