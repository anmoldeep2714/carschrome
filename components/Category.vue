<script setup>
import { useMenuStore } from '~/stores/menu';
const menuStore = useMenuStore();
const menuData = ref([]);
const categoryData = ref([]);
menuData.value = menuStore.getMenuData();
categoryData.value = menuStore.getCategoryData();

const isSelectedCategory = (category_id)=>{
    return category_id==categoryData.value.category.term_id
}

</script>
<template>
    <main>
        <div class="breadcrumb-header-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="breadcrumb-header">
                        <ul>
                            <li><a href="/"><span>Home</span></a></li>
                            <li><span>Shop filter</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="shop-filter-list-section">
            <div class="wrapper">
                <div class="inner">
                    <div class="shop-filter-left">
                        <div class="shop-filter-wrapper" v-for="(menu, menuIndex) in menuData" :key="menuIndex">
                            <div class="shop-filter-heading shop-filter-accordian-heading" v-html="menu.post_title"></div>

                            <div class="shop-filter-accordian-content" style="display: block;">
                                <div class="input-check-wrapper" v-for="(childMenu, childMenuIndex) in menu.children">
                                    <input type="checkbox" name="" :checked="isSelectedCategory(childMenu.object_id)"
                                        :id="`check-accelerator${menuIndex}_${childMenuIndex}`"><svg class="svg--checkbox-border"
                                        xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <rect width="14" height="14" x="1" y="1" rx="2" transform=""></rect>
                                    </svg>
                                    <label :for="`check-accelerator${menuIndex}_${childMenuIndex}`" v-html="childMenu.post_title"></label>
                                    <span class="count">(1)</span>
                                </div>
                                <div class="view-more-toggle">
                                    <span>View more</span>
                                </div>
                            </div>
                        </div>

                       <!--  <div class="filter-submission-wrapper">
                            <button type="submit">
                                <span>Filter</span>
                            </button>
                        </div> -->
                    </div>
                    <div class="product-list-wrapper">
                        <div class="product-list-header-wrapper">
                            <div class="showing-count">Showing 1–16 of 44 results</div>
                            <div class="sorting-dropdown">
                                <div class="selected-value">Default sorting</div>
                                <div class="sorting-dropdown-list">
                                    <ul>
                                        <li>Default sorting</li>
                                        <li>Sort by popularity</li>
                                        <li>Sort by latest</li>
                                        <li>Sort by price high to low</li>
                                        <li>Sort by price low to high</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="products-grid" data-grid-layout="4">
                            <div class="product-card" v-for="(product,productIdx) in categoryData.products">
                                <a href="" class="link-wrapper"></a>
                                <div class="product-content-top">
                                    <div class="compare-wishlist-wrapper">
                                        <div class="add-to-wishlist">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15.998" height="15.006"
                                                viewBox="0 0 15.998 15.006">
                                                <path
                                                    d="M805,648.4a4.485,4.485,0,0,0-3.44-1.723,3.953,3.953,0,0,0-3.333,1.573,3.677,3.677,0,0,0-3.333-1.573,4.482,4.482,0,0,0-3.44,1.724,5.511,5.511,0,0,0-1.136,4.455c.84,4.471,7.2,8.525,7.474,8.7a.817.817,0,0,0,.871,0c.27-.17,6.634-4.224,7.474-8.7A5.514,5.514,0,0,0,805,648.4Zm-.482,4.146c-.592,3.153-4.9,6.34-6.291,7.3-1.4-.96-5.7-4.147-6.292-7.3a3.819,3.819,0,0,1,.786-3.083,2.855,2.855,0,0,1,2.172-1.119,3.03,3.03,0,0,1,2.583,1.724.822.822,0,0,0,.746.487h0a.826.826,0,0,0,.748-.482,3.032,3.032,0,0,1,2.585-1.729,2.855,2.855,0,0,1,2.172,1.119,3.818,3.818,0,0,1,.795,3.085Z"
                                                    transform="translate(-790.228 -646.676)"></path>
                                            </svg>
                                        </div>
                                        <div class="add-to-compare">
                                            <svg class="compare" xmlns="http://www.w3.org/2000/svg" width="22.077"
                                                height="16.651" viewBox="0 0 22.077 16.651">
                                                <g>
                                                    <path
                                                        d="M13.62 10.882H3.42l2.067-2.066a1 1 0 0 0 0-1.412.989.989 0 0 0-.705-.293.992.992 0 0 0-.707.293L.319 11.159a.98.98 0 0 0 0 1.445l3.754 3.754a1 1 0 1 0 1.413-1.412l-2.067-2.067h10.2a1 1 0 1 0 0-2Z">
                                                    </path>
                                                    <path
                                                        d="M22.077 4.76a.989.989 0 0 0-.317-.722L18.003.283a1.023 1.023 0 0 0-1.412 0 1 1 0 0 0 0 1.412l2.066 2.066h-10.2a1 1 0 1 0 0 2h10.2L16.59 7.828a1 1 0 0 0 1.412 1.413l3.755-3.755a.988.988 0 0 0 .32-.726Z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-image">
                                    <img :src="product.image_url" alt="">
                                </div>
                                <div class="product-content">
                                    <div class="categories">
                                        <a href="">{{product.categories}}</a>
                                    </div>
                                    <div class="product-name">
                                        <a href="" v-html="product.name"></a>
                                    </div>
                                    <div class="product-price">
                                        <span class="currency">$</span>
                                        {{ product.price }}
                                    </div>
                                </div>
                                <a href="" class="cart-button">
                                    <span>Select options</span>
                                    <svg class="dropdown-cart" xmlns="http://www.w3.org/2000/svg" width="16.665"
                                        height="18" viewBox="0 0 16.665 18">
                                        <path
                                            d="M15.816 3.962a.85.85 0 0 0-.848.848v4.4a1 1 0 0 1-1 1H5.511a1 1 0 0 1-1-1V2.26a.848.848 0 0 0-.468-.759L1.222.092A.854.854 0 0 0 .085.473a.85.85 0 0 0 .381 1.138l2.349 1.174V9.21a2.7 2.7 0 0 0 2.694 2.7h8.461a2.7 2.7 0 0 0 2.7-2.7v-4.4a.85.85 0 0 0-.854-.848Z">
                                        </path>
                                        <path
                                            d="M6.534 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.769.769 0 0 1-.768.768Z">
                                        </path>
                                        <path
                                            d="M14.018 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.768.768 0 0 1-.768.768Z">
                                        </path>
                                        <path d="M12.257 2.977h-5.03a.85.85 0 1 0 0 1.7h5.03a.85.85 0 0 0 0-1.7Z"
                                            class="dropdown-cart-plus"></path>
                                        <path d="M10.59 6.34V1.31a.85.85 0 1 0-1.7 0v5.03a.85.85 0 1 0 1.7 0Z"
                                            class="dropdown-cart-plus"></path>


                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="products-list-paginations">
                            <ul>
                                <li class="active"><a href="">1</a></li>
                                <li><a href="">2</a></li>
                                <li><a href="">3</a></li>
                                <li class="next"><a href=""><svg class="qodef-svg--pagination-arrow-right"
                                            xmlns="http://www.w3.org/2000/svg" width="7.071" height="11.313"
                                            viewBox="0 0 7.071 11.313">
                                            <rect width="8" height="2" transform="translate(7.071 5.657) rotate(135)">
                                            </rect>
                                            <rect width="8" height="2" transform="translate(5.657 7.071) rotate(-135)">
                                            </rect>
                                        </svg></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>