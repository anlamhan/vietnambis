<template>  
  <header class="navbar">    
      <Navbar      
      :navLinks="[
        {
          name: 'Trang Chủ',
          link: '/',
          dropdown: false,
        },
        { name: 'Tìm doanh nghiệp', link: '/vn/doanh-nghiep', dropdown: false },
        { name: 'Blog', link: '/vn/blog', dropdown: false },
        { name: 'Giới thiệu', link: '/vn/gioi-thieu', dropdown: false },

        {
          name: 'Liên hệ',
          link: '/vn/lien-he',
           dropdown: false,
          /*dropdownLinks: [ 
            { name: 'A', link: '/pA', dropdown: false },
            { name: 'B', link: '/pB', dropdown: false },
          ], */
        },
        {
          name: 'Tiếng Anh',
          link: '/en',
          dropdown: false,
          /* dropdownLinks: [ 
            { name: 'C', link: '/pA', dropdown: false },
            { name: 'D', link: '/pB', dropdown: false },
          ], */
        },
      ]"
    />
    <!-- </div> -->
  </header>
</template>
<script>
import Navbar from '~/components/Navbar'
export default {
    components: { Navbar }
}
</script>
<style scoped>
 header{
        display: grid;
         grid-template: 60px / 1fr;        
        background-color: rgb(38, 50, 56);
    } 
/* .navbar {
    border-bottom: none;
    box-shadow: 0 4px 4px 0 rgba(0,0,0,.1);
}
.navbar, .sidebar-mask {    
    top: 0;
    left: 0;
}
.navbar {
    z-index: 20;
    right: 0;
    height: 6.6rem;
    background-color: #333;
    box-sizing: border-box;
    border-bottom: 1px solid #eaecef;
}
.navbar {
    padding: .7rem 1.5rem;
    line-height: 2.2rem;
} */
user agent stylesheet
header {
    display: block;
}

/* .navbar .container {
    display: flex;
}
    .app-links{ 
        padding-left: 1.5rem;
    box-sizing: border-box;    
    white-space: nowrap;    
    margin-left: auto;
    right: 1.5rem;
    top: .7rem;
    display: flex;
    } */

    .brand-name {
        margin: 0 10px;
        font-size: 1.3rem;
    }

    .brand-name a {
        text-decoration: none;
        color: white;
    }

    .drawer-toggle .bar {
        width: 90%;
        height: 2px;
        background-color: white;
    }

    .drawer-toggle {
        display: flex;
        justify-self: end;
        flex-direction: column;
        justify-content: space-around;
        height: 50%;
        width: 35px;
        padding-right: 16px;
        cursor: pointer;
    }
.site {
  font-size: 56px;
  color: rgba(250, 250, 250, 0.85);
  padding: 40px 0 10px 0;
  display: flex;
  align-items: center;
}

.site img {
  width: 140px;
  border-radius: 100%;
  margin-right: 20px;
}

/* .nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(38, 50, 56);
  font-size: 20px;
} */

a {
  color: rgba(250, 250, 250, 0.4);
  margin-right: 20px;
  line-height: 60px;
  height: 60px;
  position: relative;
  transition: all 0.2s ease-in;
}

a.nuxt-link-exact-active {
  color: rgba(250, 250, 250, 1);
}

a.nuxt-link-exact-active::after {
  content: '';
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -1px;
  height: 2px;
  background: rgba(250, 250, 250, 0.8);
}

a:last-child {
  margin-right: 0
}

.menu a:hover {
  color: rgba(250, 250, 250, 1);
}

@media screen and (max-width: 960px) {
  header {
    padding: 0;
  }
  .site {
    flex-direction: column;
    font-size: 26px;
    padding: 30px 0
  }
  .site img {
    margin: 0 0 10px 0;
  }
  /* .nav {
    justify-content: center;
    font-size: 14px;
  } */
}
@media (max-width: 767px) {
        header{
            padding: 0 16px;
        }
        header:nth-child{
            justify-self: end !important;
        }
        .app-links {
            display: none;
        }
    }

    @media (min-width: 768px) {
        header{
            padding: 0 64px;
        }
        /* .app-links {
            display: block;
        } */
        .drawer-toggle {
            display: none;
        }

    }
</style>
