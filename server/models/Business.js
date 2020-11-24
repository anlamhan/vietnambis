let db = require('../util/DBUtil');
let pageCfg = require('../../util/api.config')
import { businessToSQLUpdate } from '../../util/assist'

export default class Business {
   
    list(params, callback) {
        try {
        let sql = 'SELECT a.id,a.tax_id, a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug, a.vnslug, a.english_address, a.vietnamese_address FROM businesses a';        
        if (params.scope === '1') {
            sql += ` WHERE a.is_public = '${params.scope}' `
        }
        sql += ' ORDER BY a.id DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`        
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }

    search(params, callback) {
        try {
        let sql = 'SELECT a.id,a.tax_id, a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug, a.vnslug, a.english_address, a.vietnamese_address FROM businesses a';        
        if (params.scope === '1') {
            sql += ` WHERE a.is_public = '${params.scope}' `
        }
        sql += ` WHERE a.tax_id = '${params.keyword}' ` 
        sql += ' ORDER BY a.id DESC ' 
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`        
        console.log(sql);
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }

    getBusinessesBy(params, callback) {
        try {
        let sql = 'SELECT a.id, a.tax_id, a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug, a.vnslug, a.english_address, a.vietnamese_address FROM businesses a';
        // sql +=`GROUP_CONCAT( Coalesce(' ' + a.english_address, '')            
        // case when coalesce(c.commune_name,'') <> '' then ', ' + c.commune_name +(case when c.category = 1 then ' Ward'
        //     when c.category = 2 then ' Commune'
        //     when c.category = 3 then ' District' 
        //     when c.category = 4 then ' Town' 
        //     when c.category = 5 then ' District' else ' Commune' end) else '' end+	
        //     case when coalesce(D.district_name,'') <> '' then ', ' + d.district_name +(case D.category when 1 then ' Dist.'
        //     when 2 then ' Dist.'
        //     when 3 then ' City' 
        //     else '' end) else '' end +
        //     case when coalesce(p.province_name,'') <> '' then ', ' + p.province_name else '' end
            
        //     ) AS main_address FROM businesses a`
        // sql += ' left join communes c on a.commune_id=c.id '
        // sql += ' left join districts d on a.district_id=d.id '
        // sql += ' left join provinces p on a.province_id=p.id '
        if(params.type === 'province'){
            sql += ` WHERE a.province_id = '${params.id}' `
        }
        else if(params.type === 'district')
        {
            sql += ` WHERE a.district_id = '${params.id}' `
        }
        else if(params.type === 'commune')
        {
            sql += ` WHERE a.commune_id = '${params.id}' `
        }
        else
        {
            sql += ` WHERE a.industry_id = '${params.id}' `
        }
        if (params.scope === '1') {
            sql += `and a.is_public = '${params.scope}' `
        }
        sql += 'ORDER BY a.id DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`   
                
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }

    getDayBusinessbyDistrict(params, callback) {
        try {
        let sql = 'SELECT a.id, a.tax_id, a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug, a.vnslug, a.english_address, a.vietnamese_address FROM businesses a';
        sql +=` WHERE a.district_id = ${params.id} and a.established_date = '${params.date}'`
        
        if (params.scope === '1') {
            sql += `and a.is_public = '${params.scope}' `
        }
        sql += 'ORDER BY a.id DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`   
        console.log(sql);
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }

    getUrls(params, callback) {
        try {
        let sql = 'SELECT a.id, a.slug, a.vnslug FROM businesses a';        
        
        if (params.scope === '1') {
            sql += `and a.is_public = '${params.scope}' `
        }
        sql += ' ORDER BY a.id DESC '
        sql += `LIMIT 5000`                   
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }            
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }

    getBusinessesByIndustry(industry_id, params, callback) {        
        try {
        let sql = 'SELECT a.id, a.tax_id,a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug,a.vnslug, a.english_address, a.vietnamese_address FROM businesses a';        
            sql += ` WHERE a.industry_id = '${industry_id}' and a.is_public = 1 `        
        // if (params.scope === '1') {
        //     sql += `and a.is_public = '${params.scope}' `
        // }
        sql += 'ORDER BY a.id DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`    
        //console.log(sql)            
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    } 
    
    getBranchesByBusiness(business_id, params, callback) {                
        try {
        let sql = 'SELECT a.id,a.tax_id,a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug,a.vnslug, a.english_address, a.vietnamese_address FROM businesses a';        
            sql += ` join branches b on a.id = b.branch_id WHERE b.business_id = '${business_id}' `        
        if (params.scope === '1') {
            sql += `and a.is_public = '${params.scope}' `
        }
        sql += 'ORDER BY a.id DESC '
        // sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`    
                   
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }
    
    getbyfeatured(params, callback) {        
        try {
        let sql = 'SELECT a.id,a.tax_id,a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug,a.vnslug, a.english_address, a.vietnamese_address FROM businesses a';        
            sql += ` WHERE a.featured = 1 and a.is_public = 1 `        
        sql += 'ORDER BY a.capital DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`            
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }   

    getBusinessByDate(params, callback) {        
        try {
        let sql = 'SELECT a.id,a.tax_id,a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug,a.vnslug, a.english_address, a.vietnamese_address, a.established_date FROM businesses a';        
            sql += ` WHERE a.is_public = 1 and a.established_date='${params.date}' `     
        sql += 'ORDER BY a.capital DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`      
        console.log(sql)  ;
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
            //console.log(result)    
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }   

    getBusinessByName(params, callback) {        
        try {
        let sql = 'SELECT a.id,a.tax_id,a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug,a.vnslug, a.english_address, a.vietnamese_address, a.vn_legal_representative FROM businesses a';        
            sql += ` WHERE a.is_public = 1 and a.vn_legal_representative='${params.name}' `     
        sql += 'ORDER BY a.capital DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`      
          
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
            //console.log(result)    
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    } 

    getBusinessesByDistrict(params, callback) {
        try {
        let sql = 'SELECT a.id,a.tax_id,a.english_name,a.vietnamese_name,a.full_name,a.updated_at,a.is_public,a.slug,a.vnslug, a.english_address, a.vietnamese_address FROM businesses a';
        // sql +=`Stuff( Coalesce(' ' + a.english_address, '')            
        // case when coalesce(c.commune_name,'') <> '' then ', ' + c.commune_name +(case c.category when 1 then ' Ward'
        //     when 2 then ' Commune'
        //     when 3 then ' District' 
        //     when 4 then ' Town' 
        //     when 5 then ' District' else ' Commune' end) else '' end+	
        //     case when coalesce(D.district_name,'') <> '' then ', ' + d.district_name +(case D.category when 1 then ' Dist.'
        //     when 2 then ' Dist.'
        //     when 3 then ' City' 
        //     else '' end) else '' end +
        //     case when coalesce(p.province_name,'') <> '' then ', ' + p.province_name else '' end
            
        //     , 1, 1, '') AS [main_address] FROM businesses a`
        // sql += ' left join communes c on a.commune_id=c.id '
        // sql += ' left join districts d on a.district_id=d.id '
        // sql += ' left join provinces p on a.province_id=p.id '
        sql += ` WHERE a.district_id = '${params.id}' `
        if (params.scope === '1') {
            sql += `and a.is_public = '${params.scope}' `
        }
        sql += 'ORDER BY a.id DESC '
        sql += `LIMIT ${params.pageNo * pageCfg.pageSize},${pageCfg.pageSize}`                
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }
    
    one(businessId, callback) {
        let sql = 'SELECT a.id,a.english_name,a.vietnamese_name,a.full_name, a.abbreviated_name, a.employees, a.tax_id, a.last_updated, a.is_public,a.slug,a.vnslug, a.industry_id, a.english_address, a.vietnamese_address, a.tel, a.fax, a.email, a.website, a.bank_info, a.district_id, a.english_address, a.legal_representative, a.vn_legal_representative, DATE_FORMAT(a.established_date, \'%Y-%m-%d\') as established_date, DATE_FORMAT(a.established_date, \'%d-%m-%Y\') as vn_established_date, DATE_FORMAT(a.registered_date, \'%Y-%m-%d\') as registered_date, DATE_FORMAT(a.registered_date, \'%d-%m-%Y\') as vn_registered_date, a.registration_number, a.business_id, a.parent_id';
        sql += ', a.commune_id, a.province_id, a.district_id, d.vietnamese_name as district_vietnamese_name, c.vietnamese_name as commune_vietnamese_name, c.slug as commune_slug, c.full_commune_name,';
        sql += ' d.slug as district_slug, d.full_district_name, p.slug as province_slug, p.province_name, p.vietnamese_name as province_vietnamese_name FROM businesses a';        
        sql += ` left join communes c on a.commune_id = c.id`
        sql += ` left join districts d on a.district_id = d.id`
        sql += ` left join provinces p on a.province_id = p.id`
        sql += ' WHERE a.id = ? ';        
        db.query(sql, [businessId], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
            console.log(result)
        });
    }

    getIndustriesByBusiness(business_id, callback) {                
        try {
        let sql = 'SELECT a.id, a.code, a.full_code, a.english_name,a.industry_name, a.slug, a.vnslug, b.is_main FROM businessindustries b';        
            sql += ` join industries a on b.industry_id = a.id WHERE b.business_id = ? `                
            sql += `and a.slug is not null `
        
        sql += 'ORDER BY a.is_featured '                    
        db.query(sql, [business_id], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }

    getParentBusiness(business_id, callback) {                
        try {
        let sql = 'SELECT a.id, a.english_name,a.full_name, a.slug, a.vnslug FROM businesses a WHERE a.id = ?';
        db.query(sql, [business_id], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } catch (error) {
        res.json({ code: 500, message: error+ '-Program error！' })
      }
    }
    
    insert(biz, callback) {
        let sql = 'INSERT INTO businesses (english_name,vietnamese_name,full_name,abbreviated_name , tax_id,registered_date'
        sql+=',registration_number,established_date,employees,tel,fax,email,website,status,business_type_id,industry_id,legal_representative,'
        sql+='vn_legal_representative,business_id,english_address,vietnamese_address,commune_id,district_id,province_id,bank_account,'
        sql+='bank_info,capital,is_public,deleted,last_updated,created_at,updated_at,slug,featured, vnslug) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        let params = [
            biz.english_name,
            biz.vietnamese_name,
            biz.full_name,
            biz.abbreviated_name,
            biz.tax_id,
            biz.registered_date,
            biz.registration_number,
            biz.established_date,            
            biz.employees,
            biz.tel,
            biz.fax,
            biz.email,
            biz.website,
            biz.status,
            biz.business_type_id,
            biz.industry_id,
            biz.legal_representative,
            biz.vn_legal_representative,
            biz.business_id,
            biz.english_address,
            biz.vietnamese_address,
            biz.commune_id,
            biz.district_id,
            biz.province_id,
            biz.bank_account,
            biz.bank_info,
            biz.capital,
            biz.is_public,
            false,//deleted
            biz.last_updated,
            new Date(),
            new Date(),            
            biz.slug,
            biz.featured,
            biz.vnslug
        ]
        db.query(sql, params, (err, result) => {
            if (err) {
                return callback(true);
            }
            return callback(false, result.insertId);
        });
    }   
   
    updateCapital(id,capital, callback) {
        let sql = 'UPDATE businesses SET capital=? WHERE business_id = ?'                
        let params = [capital, id]
        db.query(sql, params, (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result.changedRows);
        });
    }
    
    count(scope, callback) {
        let sql = 'SELECT COUNT(id) AS count FROM businesses';
        if (scope === '1') {
            sql += ` WHERE is_public = '${scope}'`
        }
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0].count);
        });
    }
    countby(params, callback) {
        let sql = 'SELECT COUNT(a.id) AS count FROM businesses a';
        if(params.type === 'province'){
            sql += ` WHERE a.province_id = '${params.id}' `
        }
        else if(params.type === 'district')
        {
            sql += ` WHERE a.district_id = '${params.id}' `
        }
        else if(params.type === 'commune')
        {
            sql += ` WHERE a.commune_id = '${params.id}' `
        }
        else
        {
            sql += ` WHERE a.industry_id = '${params.id}' `
        }
        if (params.scope === '1') {
            sql += ` and a.is_public = '${params.scope}'`
        }
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0].count);
        });
    }
    countDayBusinessbyDistrict(params, callback) {
        let sql = 'SELECT COUNT(a.id) AS count FROM businesses a';
        sql += ` WHERE a.district_id = ${params.id} and a.established_date='${params.date}'`        
        if (params.scope === '1') {
            sql += ` and a.is_public = '${params.scope}'`
        }
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0].count);
        });
    }
    countbyfeatured(callback) {
        let sql = 'SELECT COUNT(a.id) AS count FROM businesses a where a.featured = 1 and a.is_public = 1';        
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0].count);
        });
    }
    countBusinessByDate(params, callback) {
        let sql = `SELECT COUNT(a.id) AS count FROM businesses a where a.is_public = 1 and a.established_date = '${params.date}' `;                
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0].count);            
        });
    }
    countBusinessByName(params, callback) {
        let sql = `SELECT COUNT(a.id) AS count FROM businesses a where a.is_public = 1 and a.vn_legal_representative = '${params.name}' `;                
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0].count);            
        });
    }
    update(business, callback) {
        let sql = 'UPDATE businesses SET ' + businessToSQLUpdate(business).updated + ' WHERE id = ?'
        console.log(sql)
        let params = businessToSQLUpdate(business).params
        console.log(params)
        params.push(business.id);

        db.query(sql, params, (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result.changedRows);
        });
    }
}