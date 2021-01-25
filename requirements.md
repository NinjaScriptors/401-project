# Software Requirements


## Vision

A lot of people in our society like students and mothers depend on home-made
products as their source of income.
In most cases they have to work from home because of the high cost of real
marketplaces and the long time that will be spent on the process of selling.
Nowadays with the use of e-commerce, the sale of physical products can be
online, which reduces cost and time.
Our web application is for supporting these owners of home-made products to promote their businesses and publish them to the highest percentage of customers. We’re aiming to gather all of these owners in one place that will be interactive and where customers can connect to them in an easy and direct way which will help the owners in understanding customers, marketing their products and achieving a good financial status. We're looking forward being the first platform of its kind in Jordan.



## Scope (In/Out)

#### 1. IN:  

- Users will  be able to sign in/up to use the app
- Sellers will be able to create a store for their products
- Sellers will be able to add products and update them               
- Customers will be able to add comments on the products
- Customers will be able to rate the products 
- Customers will be able to see the categories of products 
- Sellers and customers will be able to have a real-time chat
- Admin will be able to delete stores and products 




#### 2. OUT: 

- The webapp will never at this moment turn into an IOS or Android app



### Minimum Viable Product

- Sign in/up using email and password or a third-party resource.
- Add/Update products by the seller
- Create a store by the seller
- Add comments/rates by the customers
- Real-time chat between seller and customer



### Stretch goal

- The seller will be able to create more than one store
- Email verification 
- Sorting and filtering products 
- Bookmark favorite products



## Functional Requirements

- The admin shall be able to delete products/stores
- Only the admin shall be able to update a user profile to be an admin
- The customer shall be able to add comments/rate
- The customer shall not be able to add products
- The customer shall be able to update her/his profile to be a seller
- The customer shall know the price and details of the product before ordering
- The seller shall be able to add/update products 
- The seller shall be able to create a store
- The seller shall not be able to update other sellers products



## Non-Functional Requirements

1. **Performance**
We achieved high performance by avoiding repetitive and costly work in one file and avoiding overly large single scripts and by modularizing our code. We used mongoDB which is
built on a NoSQL structure that uses a document storage system and that increases
the response time as we put into consideration the best practices of data modeling and designed our schemas and collections in a flexible best-practice way.

2. **Scalability**
Our application takes into consideration various types of businesses not only one type, and
it’s suitable for everyone regarding their lifestyle, purchasing habits or the
demographics. 

3. **Security**
Our application provides secure and trusted authentication using Bearer Authentication which
is a security scheme with type: http and scheme: bearer. 

 

## Data Flow 

When the user enters the webapp they will first see the homepage where it has a welcoming message and the services provided by the webapp in addition to some information about us, also some statistics about the app. 
In the nav bar there will be links to the different categories, stores, locations and under each of these links she/he will see the contents of each page.
In each of the categories page the user will see the products under this category, if the user is not signed up she/he will not be able to comment/ rate/ call the seller/ bookmark favorite products.
In the store page, the products of this store will be displayed with their details.



# User Stories

1.  - **Title**: Sign in/up
    - **User story**: As a user, I want to be able to sign in/up to use the app
    - **Feature tasks**: User can sign in/up to the app
    - **Acceptance test**: Ensure that the user is signed in/up


2.  - **Title**: Create a store
    - **User story**: As a seller, I want to be able to create a store for my
      products
    - **Feature tasks**: User can create a store
    - **Acceptance test**: Ensure that the user is able to create a store


3.  - **Title**: Add/Update a product
    - **User story**: As a seller, I want to be able to add/update the
      products I want
    - **Feature tasks**: User can add products
    - **Acceptance test**: Ensure that the products is added to the right user


4.  - **Title**: Adding a comment
    - **User story**: As a buyer, I want to be able to add comments on the
      products
    - **Feature tasks**: User can add comments
    - **Acceptance test**: Ensure that the comments are added


5.  - **Title**: Rate products
    - **User story**: As a buyer, I want to be able to rate the products
    - **Feature tasks**: User can rate products
    - **Acceptance test**: Ensure that the user is able to rate


6.  - **Title**: Delete a product
    - **User story**: As an admin, I want to be able to delete the
      products when the seller no longer is selling it
    - **Feature tasks**: Admin can delete products
    - **Acceptance test**: Ensure that the products is deleted tby the admin only


7.  - **Title**: Consistency 
    - **User story**: As a user, I want my data to be consistent and still exists
      after I leave the app
    - **Feature tasks**: User’s data is consistent
    - **Acceptance test**: Ensure that the user’s data is consistent


